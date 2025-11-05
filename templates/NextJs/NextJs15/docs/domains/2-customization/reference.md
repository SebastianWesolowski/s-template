# Customization Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Placeholders

### Project Identity

- `{{PLACEHOLDER_REPO_NAME}}`

  - **Opis:** Nazwa repozytorium/projektu
  - **Typ:** string
  - **Wymagany:** tak
  - **Użycie w plikach:** package.json, README.md, LICENSE, .github/FUNDING.yml
  - **Przykład:** "my-awesome-project"

- `{{PLACEHOLDER_GITHUB_USER}}`

  - **Opis:** Nazwa użytkownika GitHub
  - **Typ:** string
  - **Wymagany:** tak
  - **Użycie w plikach:** package.json, README.md, .github/FUNDING.yml
  - **Przykład:** "johndoe"

- `{{PLACEHOLDER_REPO_URL}}`
  - **Opis:** URL repozytorium GitHub
  - **Typ:** string (URL)
  - **Wymagany:** nie
  - **Użycie w plikach:** README.md, dokumentacja
  - **Przykład:** "https://github.com/johndoe/my-awesome-project"

### Author Information

- `{{PLACEHOLDER_FULL_NAME}}`

  - **Opis:** Pełne imię i nazwisko autora
  - **Typ:** string
  - **Wymagany:** tak
  - **Użycie w plikach:** package.json, LICENSE
  - **Przykład:** "John Doe"

- `{{PLACEHOLDER_PAGE_AUTHOR}}`

  - **Opis:** Strona autora (np. www.example.com)
  - **Typ:** string (URL)
  - **Wymagany:** nie
  - **Użycie w plikach:** .github/FUNDING.yml, LICENSE, README.md
  - **Przykład:** "www.example.com"

- `{{PLACEHOLDER_EMAIL}}`
  - **Opis:** Email autora
  - **Typ:** string (email)
  - **Wymagany:** nie
  - **Użycie w plikach:** package.json, .github/FUNDING.yml
  - **Przykład:** "john@example.com"

### Technical Details

- `{{PLACEHOLDER_NODE_VERSION}}`

  - **Opis:** Wersja Node.js (z .nvmrc)
  - **Typ:** string (semver)
  - **Wymagany:** tak
  - **Użycie w plikach:** .nvmrc, package.json
  - **Przykład:** "20.17.0"

- `{{PLACEHOLDER_CURRENT_YEAR}}`

  - **Opis:** Aktualny rok, wypełniany automatycznie
  - **Typ:** string (number)
  - **Wymagany:** nie
  - **Użycie w plikach:** LICENSE
  - **Przykład:** "2024"

- `{{PLACEHOLDER_DESCRIPTION}}`
  - **Opis:** Opis projektu
  - **Typ:** string
  - **Wymagany:** nie
  - **Użycie w plikach:** package.json, README.md
  - **Przykład:** "A template for creating npm packages using TypeScript"

### URLs and Links

- `{{PLACEHOLDER_AUTHOR_URL}}`

  - **Opis:** URL autora
  - **Typ:** string (URL)
  - **Wymagany:** nie
  - **Użycie w plikach:** README.md, dokumentacja
  - **Przykład:** "https://github.com/johndoe"

- `{{PLACEHOLDER_DOCS_URL}}`
  - **Opis:** URL dokumentacji
  - **Typ:** string (URL)
  - **Wymagany:** nie
  - **Użycie w plikach:** README.md, package.json
  - **Przykład:** "https://github.com/johndoe/my-awesome-project#readme"

## Configuration API

### CustomizeConfig Type

```typescript
interface CustomizeConfig {
  replacements: Replacement[];
  cleanupExtensions?: string[];
}

interface Replacement {
  placeholder: string;
  value: string | (() => string);
  files: string[];
}
```

### Replacements Configuration

> [!NOTE] Wystąpienie tematu: Configuration API
> Szczegóły konfiguracji customization.
> Źródło: [tech-customize.md](tech-customize.md#3-konfiguracja)

**Struktura obiektu Replacement:**

- `placeholder` - tekst do zastąpienia (wzorzec)
- `value` - wartość zastępcza (string lub funkcja zwracająca string)
- `files` - tablica ścieżek plików do przetworzenia

**Przykłady konfiguracji:** [tech-customize.md](tech-customize.md#3-konfiguracja) — szczegółowe przykłady z wyjaśnieniami

## Supported Files

> [!NOTE] Wystąpienie tematu: Pliki przetwarzane
> Lista plików obsługiwanych przez customization.
> Źródło: [tech-customize.md](tech-customize.md#pliki-przetwarzane)

| Plik                        | Zawartość                                   | Przykład                                |
| --------------------------- | ------------------------------------------- | --------------------------------------- |
| `package.json`              | Nazwa, autor, opis, user, wersja Node, repo | `"name": "my-project"`                  |
| `README.md`                 | Tytuł, linki, odnośniki repo/autor          | `# my-project`                          |
| `LICENSE`                   | Copyright, rok, autor                       | `Copyright (c) 2024 John Doe`           |
| `.github/FUNDING.yml`       | Dane autora, wsparcie/sponsoring            | `github: johndoe`                       |
| `.nvmrc`                    | Wersja Node.js                              | `20.17.0`                               |
| `./docs/HowToAutoDeploy.md` | Odnośniki do repo, usera lub autora         | `https://github.com/johndoe/my-project` |

## File Extensions Cleanup

**cleanupExtensions** - opcjonalna tablica rozszerzeń plików do usunięcia po customizacji.

**Przykład:**

```typescript
cleanupExtensions: ['.mybak', '.backup', '.tmp'];
```

**Domyślne rozszerzenia:** `.mybak`

## Customization Process

> [!NOTE] Wystąpienie tematu: Proces customization
> Szczegółowy opis procesu customization.
> Źródło: [tech-customize.md](tech-customize.md#2-proces-customization)

1. **Walidacja konfiguracji** - sprawdzenie poprawności danych
2. **Weryfikacja plików** - sprawdzenie czy pliki docelowe istnieją
3. **Zastępowanie** - zamiana placeholderów na wartości
4. **Cleanup** - usunięcie plików z rozszerzeniami cleanupExtensions

**Szczegóły:** [tech-customize.md](tech-customize.md#2-proces-customization) — szczegółowy opis każdego kroku

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja customizacji
- [`technical.md`](technical.md) — jak używać customize tool
- [`tools/customize/customize.ts`](../../../tools/customize/customize.ts) — implementacja customize tool
- [`tools/customize/customize.config.ts`](../../../tools/customize/customize.config.ts) — przykład konfiguracji
- [`tools/customize/customize.example.config.ts`](../../../tools/customize/customize.example.config.ts) — przykład konfiguracji
- [`../../INDEX.md#2-template-customization`](../../INDEX.md#2-template-customization) — centralna nawigacja
