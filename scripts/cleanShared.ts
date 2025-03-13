import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import * as fse from "fs-extra";

const SHARED_DIR = path.join(__dirname, "../shared");
const TEMPLATES_DIR = path.join(__dirname, "../templates");
const CONFIG_PATH = path.join(__dirname, "../sync-config.yaml");

type ProjectConfig = {
  projects: string[];
  excludeFiles?: string[];
  asName?: string;
};

type SyncConfig = {
  [key: string]: ProjectConfig | string[];
};

function loadConfig(): SyncConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error("❌ Brak pliku sync-config.yaml");
    process.exit(1);
  }
  const fileContent = fs.readFileSync(CONFIG_PATH, "utf8");
  return yaml.load(fileContent) as SyncConfig;
}

function isProjectConfig(
  value: ProjectConfig | string[]
): value is ProjectConfig {
  return (
    typeof value === "object" && !Array.isArray(value) && "projects" in value
  );
}

function getFilesInDirectory(directory: string): string[] {
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    return [];
  }

  const result: string[] = [];

  function traverseDirectory(dir: string, baseDir: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(baseDir, fullPath);

      if (fs.statSync(fullPath).isDirectory()) {
        traverseDirectory(fullPath, baseDir);
      } else {
        result.push(relativePath);
      }
    }
  }

  traverseDirectory(directory, directory);
  return result;
}

function shouldRemoveFile(file: string, excludeFiles: string[]): boolean {
  // Sprawdź, czy plik jest na liście wykluczeń
  return !excludeFiles.some(excludedFile => {
    return file === excludedFile || path.basename(file) === excludedFile;
  });
}

function cleanSharedFiles(): void {
  const config = loadConfig();

  console.log("\n🧹 Rozpoczynam czyszczenie plików:\n");

  // Sortuj ścieżki od najbardziej szczegółowych do ogólnych
  const sortedEntries = Object.entries(config).sort((a, b) => {
    return b[0].split('/').length - a[0].split('/').length;
  });

  // Śledź już przetworzone ścieżki dla każdego template
  const processedPaths = new Map<string, Set<string>>();

  let errorCount = 0;

  sortedEntries.forEach(([sharedPath, configValue]) => {
    const srcPath = path.join(SHARED_DIR, sharedPath);
    console.log(`\n📁 Przetwarzanie: ${sharedPath}`);

    if (!fs.existsSync(srcPath)) {
      console.log(`  ⚠️ Źródło nie istnieje - pomijam`);
      return;
    }

    const projects = Array.isArray(configValue) ? configValue : configValue.projects;
    const excludeFiles = isProjectConfig(configValue) ? configValue.excludeFiles || [] : [];
    const asName = isProjectConfig(configValue) ? configValue.asName : undefined;

    if (excludeFiles.length > 0) {
      console.log(`  🚫 Pliki wykluczone:`, excludeFiles);
    }

    // Pobierz listę plików w katalogu źródłowym
    let sharedFiles: string[] = [];
    if (fs.statSync(srcPath).isDirectory()) {
      sharedFiles = getFilesInDirectory(srcPath);
    } else {
      sharedFiles = [path.basename(srcPath)];
    }

    projects.forEach((template) => {
      // Inicjalizuj Set dla template jeśli nie istnieje
      if (!processedPaths.has(template)) {
        processedPaths.set(template, new Set());
      }
      const templateProcessedPaths = processedPaths.get(template)!;

      console.log(`\n  📌 Szablon: ${template}`);

      // Określ ścieżkę docelową
      const destBasePath = asName
        ? path.join(TEMPLATES_DIR, template, path.dirname(sharedPath), asName)
        : path.join(TEMPLATES_DIR, template, sharedPath);

      // Sprawdź czy ta ścieżka (lub jej nadrzędna) została już przetworzona
      const isAlreadyProcessed = Array.from(templateProcessedPaths).some(
        processed => destBasePath.startsWith(processed)
      );

      if (isAlreadyProcessed) {
        console.log(`    ⏭️  Już przetworzono w bardziej szczegółowej konfiguracji - pomijam`);
        return;
      }

      if (!fs.existsSync(destBasePath)) {
        console.log(`    ⚠️ Ścieżka nie istnieje - pomijam: ${destBasePath}`);
        return;
      }

      try {
        if (fs.statSync(srcPath).isDirectory()) {
          // Dla katalogów, usuń tylko pliki które istnieją w katalogu źródłowym
          let removedCount = 0;

          sharedFiles.forEach(file => {
            const destFilePath = path.join(destBasePath, file);

            if (fs.existsSync(destFilePath) && shouldRemoveFile(file, excludeFiles)) {
              try {
                console.log(`    🗑️ Usuwam plik: ${destFilePath}`);
                fs.unlinkSync(destFilePath);
                removedCount++;
              } catch (fileError) {
                console.error(`    ❌ Nie można usunąć pliku ${destFilePath}:`, fileError);
                errorCount++;
              }
            }
          });

          console.log(`    ✅ Usunięto ${removedCount} plików`);
        } else {
          // Dla pojedynczego pliku, usuń go jeśli istnieje i nie jest wykluczony
          const fileName = path.basename(srcPath);
          if (fs.existsSync(destBasePath) && shouldRemoveFile(fileName, excludeFiles)) {
            console.log(`    🗑️ Usuwam plik: ${destBasePath}`);
            fs.unlinkSync(destBasePath);
          }
        }

        // Dodaj przetworzoną ścieżkę do Set
        templateProcessedPaths.add(destBasePath);

      } catch (error) {
        console.error(`    ❌ Błąd podczas usuwania plików w ${destBasePath}:`, error);
        errorCount++;
      }
    });
  });

  if (errorCount > 0) {
    console.log(`\n⚠️ Podczas czyszczenia wystąpiło ${errorCount} błędów.`);
  }

  console.log("\n✅ Czyszczenie zakończone!\n");
}

cleanSharedFiles();
