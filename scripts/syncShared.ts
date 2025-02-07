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

  console.log("\n📦 Starting synchronization:\n");

  Object.entries(config).forEach(([sharedPath, configValue]) => {
    const srcPath = path.join(SHARED_DIR, sharedPath);
    console.log(`\n📁 Processing: ${sharedPath}`);

    if (!fs.existsSync(srcPath)) {
      console.log(`  ⚠️  Source not found - skipping`);
      return;
    }

    // Handle both simple array and complex configuration
    const projects = Array.isArray(configValue)
      ? configValue
      : configValue.projects;

    const excludeFiles = isProjectConfig(configValue)
      ? configValue.excludeFiles || []
      : [];

    if (excludeFiles.length > 0) {
      console.log(`  🚫 Excluded files:`, excludeFiles);
    }

    projects.forEach((template) => {
      console.log(`\n  📌 Template: ${template}`);
      const destPath = path.join(TEMPLATES_DIR, template, sharedPath);

      // Improved exclude files check
      const isExcluded = excludeFiles.some((excluded) => {
        // Check if the excluded file exists in the source path
        const excludedPath = path.join(srcPath, excluded);
        const exists = fs.existsSync(excludedPath);
        return exists;
      });

      if (isExcluded) {
        console.log(`    ⏭️  Found excluded files - skipping`);
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
          console.log(`    ℹ️  Files identical - skipping`);
          return;
        }
        console.log(`    🔄 Content differs - updating`);
      } else {
        console.log(`    ✨ Creating new file/directory`);
      }

      fse.copySync(srcPath, finalDestPath, { overwrite: true });
    });
  });

  console.log("\n✅ Synchronization completed!\n");
}

syncSharedFiles();
