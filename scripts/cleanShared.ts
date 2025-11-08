import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import {
  SHARED_DIR,
  TEMPLATES_DIR,
  loadConfig,
  isProjectConfig,
  getFilesInDirectory,
  shouldRemoveFile,
  printJsonSummary
} from "./utils";

function cleanSharedFiles(): void {
  const config = loadConfig();

  console.log("\n🧹 Rozpoczynam czyszczenie plików:\n");

  // Przetwarzaj reguły w kolejności z pliku YAML
  // UWAGA: Użytkownik musi upewnić się, że ogólne reguły są przed szczegółowymi
  const entries = Object.entries(config);

  // Śledź już przetworzone ścieżki dla każdego template
  const processedPaths = new Map<string, Set<string>>();

  // Śledź usunięte pliki
  const removedFiles: Record<string, string[]> = {};

  let errorCount = 0;

  entries.forEach(([sharedPath, configValue]) => {
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
      // Inicjalizuj tablicę dla template jeśli nie istnieje
      if (!removedFiles[template]) {
        removedFiles[template] = [];
      }

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

      // Normalizuj ścieżkę, aby uniknąć problemów z './' i '/'
      const normalizedDestPath = path.normalize(destBasePath);

      // Sprawdź czy nadrzędna ścieżka została już przetworzona wcześniej (w pliku YAML)
      const isAlreadyProcessed = Array.from(templateProcessedPaths).some(
        processed => path.normalize(processed).startsWith(normalizedDestPath)
      );

      if (isAlreadyProcessed) {
        console.log(`    ⏭️  Już przetworzono w bardziej ogólnej konfiguracji - pomijam`);
        return;
      }

      // Sprawdź, czy mamy specjalną flagę dla kopiowania do katalogu głównego
      const copyToRoot = isProjectConfig(configValue) && configValue.copyToRoot === true;
      const finalDestPath = copyToRoot
        ? path.join(TEMPLATES_DIR, template)
        : destBasePath;

      if (!fs.existsSync(finalDestPath)) {
        console.log(`    ⚠️ Ścieżka nie istnieje - pomijam: ${finalDestPath}`);
        return;
      }

      try {
        if (fs.statSync(srcPath).isDirectory()) {
          // Dla katalogów, usuń tylko pliki które istnieją w katalogu źródłowym
          let removedCount = 0;

          sharedFiles.forEach(file => {
            // Jeśli kopiujemy do katalogu głównego, pliki są bezpośrednio w katalogu głównym
            const destFilePath = copyToRoot
              ? path.join(finalDestPath, file)
              : path.join(destBasePath, file);

            if (fs.existsSync(destFilePath) && shouldRemoveFile(file, excludeFiles)) {
              try {
                console.log(`    🗑️ Usuwam plik: ${destFilePath}`);
                fs.unlinkSync(destFilePath);
                removedFiles[template].push(destFilePath);
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
          const destFilePath = copyToRoot
            ? path.join(finalDestPath, fileName)
            : destBasePath;

          if (fs.existsSync(destFilePath) && shouldRemoveFile(fileName, excludeFiles)) {
            console.log(`    🗑️ Usuwam plik: ${destFilePath}`);
            fs.unlinkSync(destFilePath);
            removedFiles[template].push(destFilePath);
          }
        }

        // Dodaj przetworzoną ścieżkę do Set
        templateProcessedPaths.add(normalizedDestPath);

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

  // Wyświetl podsumowanie w formacie JSON
  printJsonSummary("Podsumowanie usuniętych plików", removedFiles);
}

cleanSharedFiles();
