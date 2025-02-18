const fs = require('fs');
const path = require('path');

function getPrimaryColor() {
  try {
    const configPath = path.resolve(__dirname, '../tailwind.config.ts');
    const configContent = fs.readFileSync(configPath, 'utf8');

    const primaryColorMatch = configContent.match(/500:\s*['"]([^'"]+)['"]/);
    const primaryColor = primaryColorMatch?.[1];

    if (!primaryColor) {
      throw new Error('Nie znaleziono koloru primary.500 w konfiguracji Tailwind');
    }

    return primaryColor;
  } catch (error) {
    throw new Error(`Błąd podczas pobierania koloru primary: ${error.message}`);
  }
}

function updateVSCodeSettings() {
  const settingsPath = path.join(__dirname, '../.vscode/settings.json');

  try {
    const fileContent = fs.readFileSync(settingsPath, 'utf8');
    const primaryColor = getPrimaryColor();

    const colorRegex = /"sideBar\.border":\s*"(#[A-Fa-f0-9]{6})"/;
    const match = fileContent.match(colorRegex);
    const currentColor = match?.[1];

    if (currentColor === primaryColor) {
      console.log('ℹ️ Kolory są aktualne, nie wymagają zmian');
      return true;
    }

    const updatedContent = fileContent.replace(colorRegex, `"sideBar.border": "${primaryColor}"`);

    fs.writeFileSync(settingsPath, updatedContent, 'utf8');
    console.log(`✅ Zaktualizowano kolory VS Code używając primary: ${primaryColor}`);
    return true;
  } catch (error) {
    console.error('❌ Błąd podczas aktualizacji ustawień:', error instanceof Error ? error.message : 'Nieznany błąd');
    process.exit(1);
  }
}

const hasError = updateVSCodeSettings();
process.exit(hasError ? 1 : 0);
