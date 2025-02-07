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
    console.error("❌ Missing sync-config.yaml file");
    process.exit(1);
  }
  const fileContent = fs.readFileSync(CONFIG_PATH, "utf8");
  return yaml.load(fileContent) as SyncConfig;
}

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
      console.log(`  🔍 [${template}] Comparing directory ${src}`);

      const srcFiles = fs.readdirSync(src);
      const destFiles = fs.readdirSync(dest);

      // Log directory contents
      console.log(`    Source files: ${srcFiles.join(", ")}`);
      console.log(`    Dest files: ${destFiles.join(", ")}`);

      // Check if all source files exist in destination and are identical
      for (const file of srcFiles) {
        const srcFilePath = path.join(src, file);
        const destFilePath = path.join(dest, file);

        if (!fs.existsSync(destFilePath)) {
          console.log(`    ❌ [${template}] Missing in destination: ${file}`);
          return false;
        }

        if (!compareFiles(srcFilePath, destFilePath, template)) {
          console.log(`    ❌ [${template}] Files differ: ${file}`);
          return false;
        }
      }

      return true;
    }

    // For files, compare content
    console.log(`  🔍 [${template}] Comparing file ${src}`);
    const srcContent = fs.readFileSync(src, "utf8");
    const destContent = fs.readFileSync(dest, "utf8");

    // Normalize line endings to prevent false differences
    const normalizedSrc = srcContent.replace(/\r\n/g, "\n");
    const normalizedDest = destContent.replace(/\r\n/g, "\n");

    const areIdentical = normalizedSrc === normalizedDest;
    console.log(
      `    ${areIdentical ? "✅" : "❌"} [${template}] Files ${
        areIdentical ? "match" : "differ"
      }`
    );

    return areIdentical;
  } catch (error) {
    console.error(`Error comparing files ${src} and ${dest}:`, error);
    return false;
  }
}

function isProjectConfig(
  value: ProjectConfig | string[]
): value is ProjectConfig {
  return (
    typeof value === "object" && !Array.isArray(value) && "projects" in value
  );
}

function syncSharedFiles(): void {
  const config = loadConfig();
  const templates = getAllTemplates(TEMPLATES_DIR);

  // Group logs by template
  console.log("\n📦 Starting synchronization by template:\n");

  Object.entries(config).forEach(([sharedPath, configValue]) => {
    const srcPath = path.join(SHARED_DIR, sharedPath);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️ Skipped ${sharedPath} – file/directory not found.`);
      return;
    }

    // Handle both simple array and complex configuration
    const projects = Array.isArray(configValue)
      ? configValue
      : configValue.projects;

    const excludeFiles = isProjectConfig(configValue)
      ? configValue.excludeFiles || []
      : [];

    projects.forEach((template) => {
      const destPath = path.join(TEMPLATES_DIR, template, sharedPath);

      // Skip excluded files if they match
      if (excludeFiles.some((excluded) => sharedPath.endsWith(excluded))) {
        console.log(`⏭️ [${template}] Skipping excluded file ${sharedPath}`);
        return;
      }

      // Handle file renaming if asName is specified
      const finalDestPath =
        isProjectConfig(configValue) && configValue.asName
          ? path.join(path.dirname(destPath), configValue.asName)
          : destPath;

      if (fs.existsSync(finalDestPath)) {
        const filesMatch = compareFiles(srcPath, finalDestPath, template);
        if (filesMatch) {
          console.log(
            `ℹ️ [${template}] Skipping ${sharedPath} (files identical)`
          );
          return;
        }
        console.log(
          `🔄 [${template}] Updating ${sharedPath} (content differs)`
        );
      } else {
        console.log(`✨ [${template}] Creating ${sharedPath}`);
      }

      fse.copySync(srcPath, finalDestPath, { overwrite: true });
    });
  });

  console.log("\n✅ Synchronization completed!");
}

syncSharedFiles();
