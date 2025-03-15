import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import {
  SHARED_DIR,
  TEMPLATES_DIR,
  loadConfig,
  isProjectConfig,
  printJsonSummary
} from "./utils";

function logTemplateComparison(
  templatesDir: string[],
  configTemplates: Set<string>
): void {
  console.log("\n📋 Template Comparison:");
  console.log("\n🔍 Templates in directory:");
  templatesDir.forEach((template) => console.log(`  └─ ${template}`));

  console.log("\n📄 Templates in sync-config.yaml:");
  Array.from(configTemplates)
    .sort()
    .forEach((template) => console.log(`  └─ ${template}`));

  // Find missing templates
  const missingInDir = Array.from(configTemplates).filter(
    (t) => !templatesDir.includes(t)
  );
  const unusedInConfig = templatesDir.filter((t) => !configTemplates.has(t));

  if (missingInDir.length > 0) {
    console.log("\n⚠️ Templates in config but missing in directory:");
    missingInDir.forEach((template) => console.log(`  └─ ${template}`));
  }

  if (unusedInConfig.length > 0) {
    console.log("\n💡 Templates in directory but not used in config:");
    unusedInConfig.forEach((template) => console.log(`  └─ ${template}`));
  }
  console.log(); // Empty line
}

function getAllTemplates(dir: string, baseDir: string = dir): string[] {
  let templates: string[] = [];
  const items = fs.readdirSync(dir);

  // Check if current directory contains node_modules or package.json
  if (items.includes("node_modules") || items.includes("package.json")) {
    // Found a template root, add only this directory
    const relativePath = path.relative(baseDir, dir);
    if (relativePath) {
      // Only add if not the base directory
      templates.push(relativePath);
    }
    return templates;
  }

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      // Only add templates from recursive calls
      templates = templates.concat(getAllTemplates(fullPath, baseDir));
    }
  });

  return [...new Set(templates)]; // Remove duplicates
}

function compareFiles(src: string, dest: string, template: string): boolean {
  if (!fs.existsSync(dest)) return false;
  try {
    const srcStat = fs.statSync(src);
    const destStat = fs.statSync(dest);

    // Handle directories
    if (srcStat.isDirectory() && destStat.isDirectory()) {
      const srcFiles = fs.readdirSync(src);
      const destFiles = fs.readdirSync(dest);

      // Check if all source files exist in destination and are identical
      for (const file of srcFiles) {
        const srcFilePath = path.join(src, file);
        const destFilePath = path.join(dest, file);

        if (!fs.existsSync(destFilePath)) {
          return false;
        }

        if (!compareFiles(srcFilePath, destFilePath, template)) {
          return false;
        }
      }

      return true;
    }

    // For files, compare content
    const srcContent = fs.readFileSync(src, "utf8");
    const destContent = fs.readFileSync(dest, "utf8");

    // Normalize line endings to prevent false differences
    const normalizedSrc = srcContent.replace(/\r\n/g, "\n");
    const normalizedDest = destContent.replace(/\r\n/g, "\n");

    return normalizedSrc === normalizedDest;
  } catch (error) {
    console.error(`Error comparing files ${src} and ${dest}:`, error);
    return false;
  }
}

function syncSharedFiles(): void {
  const config = loadConfig();

  console.log("\n📦 Starting synchronization:\n");

  // Najpierw posortuj ścieżki od najbardziej szczegółowych do ogólnych
  const sortedEntries = Object.entries(config).sort((a, b) => {
    return b[0].split('/').length - a[0].split('/').length;
  });

  // Śledź już przetworzone ścieżki dla każdego template
  const processedPaths = new Map<string, Set<string>>();

  // Śledź skopiowane pliki
  const copiedFiles: Record<string, string[]> = {};

  sortedEntries.forEach(([sharedPath, configValue]) => {
    const srcPath = path.join(SHARED_DIR, sharedPath);
    console.log(`\n📁 Processing: ${sharedPath}`);

    if (!fs.existsSync(srcPath)) {
      console.log(`  ⚠️  Source not found - skipping`);
      return;
    }

    const projects = Array.isArray(configValue) ? configValue : configValue.projects;
    const excludeFiles = isProjectConfig(configValue) ? configValue.excludeFiles || [] : [];
    const asName = isProjectConfig(configValue) ? configValue.asName : undefined;

    if (excludeFiles.length > 0) {
      console.log(`  🚫 Excluded files:`, excludeFiles);
    }

    projects.forEach((template) => {
      // Inicjalizuj tablicę dla template jeśli nie istnieje
      if (!copiedFiles[template]) {
        copiedFiles[template] = [];
      }

      // Inicjalizuj Set dla template jeśli nie istnieje
      if (!processedPaths.has(template)) {
        processedPaths.set(template, new Set());
      }
      const templateProcessedPaths = processedPaths.get(template)!;

      console.log(`\n  📌 Template: ${template}`);

      // Określ ścieżkę docelową
      const destPath = asName
        ? path.join(TEMPLATES_DIR, template, path.dirname(sharedPath), asName)
        : path.join(TEMPLATES_DIR, template, sharedPath);

      // Normalizuj ścieżkę, aby uniknąć problemów z './' i '/'
      const normalizedDestPath = path.normalize(destPath);

      // Sprawdź czy ta ścieżka (lub jej nadrzędna) została już przetworzona
      const isAlreadyProcessed = Array.from(templateProcessedPaths).some(
        processed => normalizedDestPath.startsWith(path.normalize(processed))
      );

      if (isAlreadyProcessed) {
        console.log(`    ⏭️  Already processed in more specific configuration - skipping`);
        return;
      }

      // Sprawdź, czy mamy specjalną flagę dla kopiowania do katalogu głównego
      const copyToRoot = isProjectConfig(configValue) && configValue.copyToRoot === true;
      const finalDestPath = copyToRoot
        ? path.join(TEMPLATES_DIR, template)
        : destPath;

      const shouldCopyFile = (src: string): boolean => {
        const relativePath = path.relative(srcPath, src);
        if (!relativePath) return true;

        const isExcluded = excludeFiles.some(excludedFile => {
          return relativePath === excludedFile ||
                 path.basename(src) === excludedFile;
        });

        if (isExcluded) {
          console.log(`    🚫 Excluding file: ${relativePath}`);
          return false;
        }

        // Dodaj plik do listy skopiowanych
        if (fs.statSync(src).isFile()) {
          const destFile = copyToRoot
            ? path.join(finalDestPath, relativePath)
            : path.join(destPath, relativePath);
          copiedFiles[template].push(destFile);
        }

        return true;
      };

      try {
        if (fs.statSync(srcPath).isDirectory()) {
          if (copyToRoot) {
            // Kopiuj zawartość folderu do katalogu głównego projektu
            const items = fs.readdirSync(srcPath);
            for (const item of items) {
              const itemSrcPath = path.join(srcPath, item);
              const itemDestPath = path.join(finalDestPath, item);

              if (shouldCopyFile(itemSrcPath)) {
                fse.copySync(itemSrcPath, itemDestPath, { overwrite: true });
              }
            }
            console.log(`    📦 Copied contents to root directory: ${finalDestPath}`);
          } else {
            // Standardowe kopiowanie
            fse.copySync(srcPath, finalDestPath, {
              filter: shouldCopyFile,
              overwrite: true
            });
          }
        } else {
          if (shouldCopyFile(srcPath)) {
            fse.copySync(srcPath, finalDestPath, { overwrite: true });
            copiedFiles[template].push(finalDestPath);
          }
        }

        // Dodaj przetworzoną ścieżkę do Set
        templateProcessedPaths.add(normalizedDestPath);

      } catch (error) {
        console.error(`Error processing ${srcPath}:`, error);
      }
    });
  });

  console.log("\n✅ Synchronization completed!\n");

  // Wyświetl podsumowanie w formacie JSON
  printJsonSummary("Podsumowanie skopiowanych plików", copiedFiles);
}

syncSharedFiles();
