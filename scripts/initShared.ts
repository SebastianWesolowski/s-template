import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

const SHARED_DIR = path.join(__dirname, "../shared");
const CONFIG_PATH = path.join(__dirname, "../sync-config.yaml");

const DEFAULT_CONFIG = {
  "github-actions": ["NextJs", "node", "startetNpmPackage/node"],
  "eslint/.eslintrc.json": ["node", "startetNpmPackage/node"],
  "prettier/.prettierrc": ["NextJs", "mockTemplateWithImageWithConfig"],
};

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
}

function createSharedStructure(): void {
  ensureDir(SHARED_DIR);
  ensureDir(path.join(SHARED_DIR, "github-actions"));
  ensureDir(path.join(SHARED_DIR, "eslint"));
  ensureDir(path.join(SHARED_DIR, "prettier"));

  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, yaml.dump(DEFAULT_CONFIG), "utf8");
    console.log(`✅ Created default config file: ${CONFIG_PATH}`);
  } else {
    console.log(`ℹ️ Config file already exists: ${CONFIG_PATH}`);
  }
}

createSharedStructure();
