import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import { TEMPLATES_DIR } from "./utils";

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

interface GitignorePattern {
  pattern: string;
  isNegation: boolean;
  isAbsolute: boolean;
}

function parseGitignore(content: string): GitignorePattern[] {
  const patterns: GitignorePattern[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    // Pomiń puste linie i komentarze
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    // Sprawdź negację
    const isNegation = trimmed.startsWith("!");
    const pattern = isNegation ? trimmed.substring(1) : trimmed;

    // Sprawdź czy ścieżka jest bezwzględna (zaczyna się od /)
    const isAbsolute = pattern.startsWith("/");

    patterns.push({
      pattern: pattern.trim(),
      isNegation,
      isAbsolute,
    });
  }

  return patterns;
}

function matchesPattern(filePath: string, pattern: string, basePath: string): boolean {
  const relativePath = path.relative(basePath, filePath).replace(/\\/g, "/");
  const normalizedPattern = pattern.replace(/\\/g, "/");

  // Jeśli wzorzec jest bezwzględny (zaczyna się od /), porównaj z początkiem ścieżki
  if (normalizedPattern.startsWith("/")) {
    const patternWithoutSlash = normalizedPattern.substring(1);
    return matchesGlob(relativePath, patternWithoutSlash, true);
  }

  // Wzorzec względny - sprawdź czy pasuje w dowolnym miejscu ścieżki
  const pathParts = relativePath.split("/");
  for (let i = 0; i < pathParts.length; i++) {
    const subPath = pathParts.slice(i).join("/");
    if (matchesGlob(subPath, normalizedPattern, false)) {
      return true;
    }
  }

  return false;
}

function matchesGlob(text: string, pattern: string, mustMatchStart: boolean): boolean {
  // Konwertuj wzorzec .gitignore na regex
  let regexStr = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&") // Escapuj specjalne znaki
    .replace(/\*\*/g, "___DOUBLE_STAR___") // Tymczasowo zamień **
    .replace(/\*/g, "[^/]*") // * dopasowuje wszystko oprócz /
    .replace(/___DOUBLE_STAR___/g, ".*"); // ** dopasowuje wszystko włącznie z /

  // Jeśli wzorzec kończy się na /, dopasowuje tylko katalogi
  const isDirectoryPattern = pattern.endsWith("/");
  if (isDirectoryPattern) {
    regexStr = regexStr.replace(/\/$/, "");
  }

  if (mustMatchStart) {
    regexStr = `^${regexStr}`;
  }

  if (isDirectoryPattern) {
    regexStr = `${regexStr}(/.*)?$`;
  } else {
    regexStr = `${regexStr}$`;
  }

  const regex = new RegExp(regexStr);
  return regex.test(text);
}

function findMatchingFiles(
  basePath: string,
  patterns: GitignorePattern[]
): string[] {
  const filesToRemove: Set<string> = new Set();
  const negatedFiles: Set<string> = new Set();

  // Pobierz wszystkie pliki raz
  const allFiles = getAllFilesRecursive(basePath);

  // Najpierw zbierz wszystkie negacje
  for (const pattern of patterns) {
    if (pattern.isNegation) {
      for (const file of allFiles) {
        if (matchesPattern(file, pattern.pattern, basePath)) {
          negatedFiles.add(file);
        }
      }
    }
  }

  // Teraz zbierz pliki do usunięcia (bez negacji)
  for (const pattern of patterns) {
    if (!pattern.isNegation) {
      for (const file of allFiles) {
        if (matchesPattern(file, pattern.pattern, basePath) && !negatedFiles.has(file)) {
          filesToRemove.add(file);
        }
      }
    }
  }

  return Array.from(filesToRemove);
}

function getAllFilesRecursive(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) {
    return files;
  }

  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          files.push(fullPath);
          files.push(...getAllFilesRecursive(fullPath));
        } else {
          files.push(fullPath);
        }
      } catch (error) {
        // Pomiń pliki, do których nie mamy dostępu
        continue;
      }
    }
  } catch (error) {
    // Pomiń katalogi, do których nie mamy dostępu
  }

  return files;
}

function removeFiles(files: string[], basePath: string): { removed: string[]; errors: string[] } {
  const removed: string[] = [];
  const errors: string[] = [];

  // Sortuj pliki, aby najpierw usuwać pliki, potem katalogi (od najgłębszych)
  const sortedFiles = files.sort((a, b) => {
    const depthA = a.split(path.sep).length;
    const depthB = b.split(path.sep).length;
    return depthB - depthA; // Najpierw najgłębsze
  });

  for (const filePath of sortedFiles) {
    try {
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          fse.removeSync(filePath);
          removed.push(filePath);
        } else {
          fs.unlinkSync(filePath);
          removed.push(filePath);
        }
      }
    } catch (error) {
      const errorMsg = `Błąd podczas usuwania ${filePath}: ${error}`;
      errors.push(errorMsg);
      console.error(`  ❌ ${errorMsg}`);
    }
  }

  return { removed, errors };
}

function cleanIgnoredFiles(): void {
  console.log("\n🧹 Czyszczenie plików ignorowanych przez .gitignore:\n");

  const templates = getAllTemplates(TEMPLATES_DIR, TEMPLATES_DIR);

  if (templates.length === 0) {
    console.log("⚠️ Nie znaleziono żadnych szablonów.");
    return;
  }

  const summary: Record<string, { removed: string[]; errors: string[] }> = {};

  templates.forEach((template) => {
    const templatePath = path.join(TEMPLATES_DIR, template);
    const gitignorePath = path.join(templatePath, ".gitignore");

    console.log(`\n${"=".repeat(80)}`);
    console.log(`📁 Szablon: ${template}`);
    console.log(`📍 Ścieżka: ${templatePath}`);
    console.log(`${"=".repeat(80)}`);

    if (!fs.existsSync(gitignorePath)) {
      console.log("\n⚠️ Plik .gitignore nie istnieje w tym szablonie - pomijam.");
      return;
    }

    try {
      const content = fs.readFileSync(gitignorePath, "utf8");
      const patterns = parseGitignore(content);

      if (patterns.length === 0) {
        console.log("\nℹ️ Brak wzorców do przetworzenia w pliku .gitignore.");
        return;
      }

      console.log(`\n📋 Znaleziono ${patterns.length} wzorców w .gitignore`);

      // Znajdź pliki pasujące do wzorców
      const matchingFiles = findMatchingFiles(templatePath, patterns);

      if (matchingFiles.length === 0) {
        console.log("\n✅ Brak plików do usunięcia.");
        summary[template] = { removed: [], errors: [] };
        return;
      }

      console.log(`\n🗑️ Znaleziono ${matchingFiles.length} plików/katalogów do usunięcia:`);
      matchingFiles.forEach((file) => {
        const relativePath = path.relative(templatePath, file);
        console.log(`  - ${relativePath}`);
      });

      // Usuń pliki
      const result = removeFiles(matchingFiles, templatePath);
      summary[template] = result;

      console.log(`\n✅ Usunięto ${result.removed.length} plików/katalogów`);
      if (result.errors.length > 0) {
        console.log(`⚠️ Wystąpiło ${result.errors.length} błędów podczas usuwania`);
      }
    } catch (error) {
      console.error(`❌ Błąd podczas przetwarzania szablonu ${template}:`, error);
      summary[template] = { removed: [], errors: [`Błąd przetwarzania: ${error}`] };
    }
  });

  console.log(`\n${"=".repeat(80)}`);
  console.log("\n📊 Podsumowanie:");

  let totalRemoved = 0;
  let totalErrors = 0;

  Object.entries(summary).forEach(([template, result]) => {
    totalRemoved += result.removed.length;
    totalErrors += result.errors.length;
    console.log(`\n  📁 ${template}:`);
    console.log(`    ✅ Usunięto: ${result.removed.length}`);
    if (result.errors.length > 0) {
      console.log(`    ❌ Błędy: ${result.errors.length}`);
    }
  });

  console.log(`\n  📦 Łącznie:`);
  console.log(`    ✅ Usunięto plików/katalogów: ${totalRemoved}`);
  console.log(`    ❌ Błędy: ${totalErrors}`);
  console.log(`\n${"=".repeat(80)}\n`);
}

cleanIgnoredFiles();

