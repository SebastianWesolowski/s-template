import fs from 'fs';
import path from 'path';

interface TailwindConfig {
  theme?: {
    extend?: {
      colors?: {
        primary?: {
          DEFAULT?: string;
          500?: string;
        };
      };
    };
  };
}

interface VSCodeSettings {
  workbench: {
    colorCustomizations: {
      [key: string]: string;
    };
  };
  [key: string]: any;
}

function getPrimaryColor(): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const tailwindConfig: TailwindConfig = require('../tailwind.config.ts');
    console.log(tailwindConfig);
    const primaryColor =
      tailwindConfig.theme?.extend?.colors?.primary?.[500] || tailwindConfig.theme?.extend?.colors?.primary?.DEFAULT;

    if (!primaryColor) {
      throw new Error('Nie znaleziono koloru primary (ani .500, ani .DEFAULT) w konfiguracji Tailwind');
    }

    return primaryColor;
  } catch (error) {
    throw new Error(`Błąd podczas pobierania koloru primary: ${error.message}`);
  }
}

function updateVSCodeSettings(): boolean {
  const settingsPath = path.join(__dirname, '../.vscode/settings.json');

  try {
    const fileContent = fs.readFileSync(settingsPath, 'utf8');
    const primaryColor = getPrimaryColor();

    // Sprawdź czy kolor się zmienił
    const colorRegex = /"sideBar\.border":\s*"(#[A-Fa-f0-9]{6})"/;
    const match = fileContent.match(colorRegex);
    const currentColor = match?.[1];

    if (currentColor === primaryColor) {
      console.log('ℹ️ Kolory są aktualne, nie wymagają zmian');
      return false;
    }

    // Zaktualizuj kolor zachowując format pliku
    const updatedContent = fileContent.replace(colorRegex, `"sideBar.border": "${primaryColor}"`);

    fs.writeFileSync(settingsPath, updatedContent, 'utf8');
    console.log(`✅ Zaktualizowano kolory VS Code używając primary: ${primaryColor}`);
    return true;
  } catch (error) {
    console.error('❌ Błąd podczas aktualizacji ustawień:', error instanceof Error ? error.message : 'Nieznany błąd');
    process.exit(1);
  }
}

// Uruchom aktualizację i zwróć wynik
const hasChanges = updateVSCodeSettings();
process.exit(hasChanges ? 0 : 1);
