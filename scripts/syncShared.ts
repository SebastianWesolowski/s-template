import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import * as fse from "fs-extra";

const SHARED_DIR = path.join(__dirname, "../shared");
const TEMPLATES_DIR = path.join(__dirname, "../templates");
const CONFIG_PATH = path.join(__dirname, "../sync-config.yaml");

type SyncConfig = Record<string, string[]>;

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

function compareFiles(src: string, dest: string): boolean {
  if (!fs.existsSync(dest)) return false;
  try {
    // Handle directories
    if (fs.statSync(src).isDirectory()) {
      return true; // Skip comparison for directories
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
  const templates = getAllTemplates(TEMPLATES_DIR);

  // Collect all unique templates from config
  const configTemplates = new Set<string>();
  Object.values(config).forEach((templateArray) => {
    templateArray.forEach((template) => configTemplates.add(template));
  });

  logTemplateComparison(templates, configTemplates);

  Object.entries(config).forEach(([sharedPath, allowedTemplates]) => {
    const srcPath = path.join(SHARED_DIR, sharedPath);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️ Skipped ${sharedPath} – file/directory not found.`);
      return;
    }

    templates.forEach((template) => {
      if (allowedTemplates.includes(template)) {
        const destPath = path.join(TEMPLATES_DIR, template, sharedPath);

        if (fs.existsSync(destPath)) {
          const filesMatch = compareFiles(srcPath, destPath);
          if (filesMatch) {
            console.log(
              `ℹ️ Skipping ${sharedPath} → ${template} (files identical)`
            );
            return;
          }
          console.log(
            `🔄 Updating ${sharedPath} → ${template} (content differs)`
          );
        } else {
          console.log(`✨ Creating ${sharedPath} → ${template}`);
        }

        fse.copySync(srcPath, destPath, { overwrite: true });
      }
    });
  });

  console.log("\n✅ Synchronization completed!");
}

syncSharedFiles();
