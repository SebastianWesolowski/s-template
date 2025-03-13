import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import * as fse from "fs-extra";

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

function cleanSharedFiles(): void {
  const config = loadConfig();

  console.log("\n🧹 Rozpoczynam czyszczenie plików:\n");

  Object.entries(config).forEach(([sharedPath, configValue]) => {
    console.log(`\n📁 Przetwarzanie: ${sharedPath}`);

    const projects = Array.isArray(configValue) ? configValue : configValue.projects;
    const excludeFiles = isProjectConfig(configValue) ? configValue.excludeFiles || [] : [];
    const asName = isProjectConfig(configValue) ? configValue.asName : undefined;

    projects.forEach((template) => {
      console.log(`\n  📌 Szablon: ${template}`);

      // Określ ścieżkę docelową
      const destPath = asName
        ? path.join(TEMPLATES_DIR, template, path.dirname(sharedPath), asName)
        : path.join(TEMPLATES_DIR, template, sharedPath);

      if (!fs.existsSync(destPath)) {
        console.log(`    ⚠️ Ścieżka nie istnieje - pomijam: ${destPath}`);
        return;
      }

      try {
        if (fs.statSync(destPath).isDirectory()) {
          console.log(`    🗑️ Usuwam katalog: ${destPath}`);
          fse.removeSync(destPath);
        } else {
          console.log(`    🗑️ Usuwam plik: ${destPath}`);
          fse.removeSync(destPath);
        }
      } catch (error) {
        console.error(`    ❌ Błąd podczas usuwania ${destPath}:`, error);
      }
    });
  });

  // Usuń puste katalogi po usunięciu plików
  cleanEmptyDirectories(TEMPLATES_DIR);

  console.log("\n✅ Czyszczenie zakończone!\n");
}

function cleanEmptyDirectories(directory: string): boolean {
  if (!fs.existsSync(directory)) return false;

  let isEmpty = true;
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const fullPath = path.join(directory, item);

    if (fs.statSync(fullPath).isDirectory()) {
      // Rekurencyjnie sprawdź i usuń puste podkatalogi
      const isSubdirEmpty = cleanEmptyDirectories(fullPath);

      // Jeśli podkatalog nie został usunięty, ten katalog nie jest pusty
      if (!isSubdirEmpty) isEmpty = false;
    } else {
      // Jeśli znaleziono plik, katalog nie jest pusty
      isEmpty = false;
    }
  }

  // Jeśli katalog jest pusty i nie jest głównym katalogiem szablonów, usuń go
  if (isEmpty && directory !== TEMPLATES_DIR) {
    console.log(`    🗑️ Usuwam pusty katalog: ${directory}`);
    fs.rmdirSync(directory);
    return true;
  }

  return isEmpty;
}

cleanSharedFiles();
