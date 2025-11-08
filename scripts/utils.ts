import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

export const SHARED_DIR = path.join(__dirname, "../shared");
export const TEMPLATES_DIR = path.join(__dirname, "../templates");
export const CONFIG_PATH = path.join(__dirname, "../sync-config.yaml");

export interface ProjectConfig {
  projects: string[];
  excludeFiles?: string[];
  asName?: string;
  copyToRoot?: boolean;
  protectFromOverwrite?: boolean;
}

export type SyncConfig = {
  [key: string]: ProjectConfig | string[];
};

export function loadConfig(): SyncConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error("❌ Brak pliku sync-config.yaml");
    process.exit(1);
  }
  const fileContent = fs.readFileSync(CONFIG_PATH, "utf8");
  return yaml.load(fileContent) as SyncConfig;
}

export function isProjectConfig(
  value: ProjectConfig | string[]
): value is ProjectConfig {
  return (
    typeof value === "object" && !Array.isArray(value) && "projects" in value
  );
}

export function getFilesInDirectory(directory: string): string[] {
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

export function shouldRemoveFile(file: string, excludeFiles: string[]): boolean {
  // Sprawdź, czy plik jest na liście wykluczeń
  return !excludeFiles.some(excludedFile => {
    return file === excludedFile || path.basename(file) === excludedFile;
  });
}

export function printJsonSummary(title: string, data: Record<string, string[]>): void {
  console.log(`\n📊 ${title}:`);

  // Sortuj ścieżki alfabetycznie dla każdego szablonu
  const sortedData: Record<string, string[]> = {};

  // Sortuj klucze (nazwy szablonów) alfabetycznie
  const sortedTemplates = Object.keys(data).sort();

  for (const template of sortedTemplates) {
    // Sortuj ścieżki alfabetycznie
    sortedData[template] = data[template].sort();
  }

  console.log(JSON.stringify(sortedData, null, 2));
}
