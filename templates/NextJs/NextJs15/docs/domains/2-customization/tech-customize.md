# Template Customization

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

### Koncepcja

Template wymaga personalizacji przed użyciem - zastąpienie placeholderów rzeczywistymi wartościami. System automatycznie waliduje, zastępuje i czyści pliki konfiguracyjne.

### Główne placeholdery

| Placeholder                       | Opis                  | Przykład                           |
| --------------------------------- | --------------------- | ---------------------------------- |
| `{{PLACEHOLDER_REPO_NAME}}`       | Nazwa repozytorium    | `my-awesome-project`               |
| `{{PLACEHOLDER_GITHUB_USER}}`     | Użytkownik GitHub     | `johndoe`                          |
| `{{PLACEHOLDER_FULL_NAME}}`       | Pełne imię i nazwisko | `John Doe`                         |
| `{{PLACEHOLDER_PAGE_AUTHOR}}`     | Strona autora         | `www.johndoe.com`                  |
| `{{PLACEHOLDER_NODE_VERSION}}`    | Wersja Node.js        | `20.17.0`                          |
| `{{A template for creating ...}}` | Opis projektu         | `A template for creating web apps` |
| `{{PLACEHOLDER_CURRENT_YEAR}}`    | Aktualny rok          | `2024`                             |

### Pliki przetwarzane

- `package.json` - metadata projektu, dependencies, scripts
- `README.md` - dokumentacja główna
- `LICENSE` - licencja projektu
- `.github/FUNDING.yml` - GitHub funding configuration
- `.nvmrc` - Node.js version specification
- `./docs/HowToAutoDeploy.md` - dokumentacja deployment

## Jak uruchomić customization

### 1. Podstawowe użycie

```bash
# Uruchom wizard customization
yarn customize
```

**Co się dzieje:**

1. Walidacja konfiguracji - sprawdzenie placeholderów w plikach
2. Zastąpienie wartości - automatyczne zastąpienie placeholderów
3. Cleanup - usunięcie plików backup i customization
4. Weryfikacja - sprawdzenie czy wszystkie placeholdery zostały zastąpione

### 2. Proces customization

**Krok 1: Walidacja**

```bash
# Sprawdza czy wszystkie placeholdery są obecne w plikach
# Sprawdza czy wartości są ustawione
# Sprawdza czy pliki istnieją
```

**Krok 2: Zastąpienie**

```bash
# Dla każdego placeholder:
# - Znajdź wszystkie wystąpienia w plikach
# - Zastąp wartością z konfiguracji
# - Zapisz zaktualizowane pliki
```

**Krok 3: Cleanup**

```bash
# Usuwa pliki backup (.mybak)
# Usuwa pliki customization (todo.md, docs/, tools/customize/)
```

**Krok 4: Weryfikacja**

```bash
# Sprawdza czy wszystkie placeholdery zostały zastąpione
# Wyświetla podsumowanie zmian
```

### 3. Konfiguracja

**Plik konfiguracyjny:** [`tools/customize/customize.config.ts`](../../../tools/customize/customize.config.ts)

```typescript
export const config: CustomizeConfig = {
  replacements: [
    {
      placeholder: '{{PLACEHOLDER_REPO_NAME}}',
      value: 'my-awesome-project',
      files: ['package.json', 'README.md'],
    },
    {
      placeholder: '{{PLACEHOLDER_GITHUB_USER}}',
      value: 'johndoe',
      files: ['package.json', 'README.md', '.github/FUNDING.yml'],
    },
    // ... więcej placeholderów
  ],
  cleanupExtensions: ['.mybak'],
};
```

**Struktura konfiguracji:**

- `replacements` - lista placeholderów do zastąpienia
- `cleanupExtensions` - rozszerzenia plików do usunięcia po customization

## Integration z DX Workflow

### Wielopoziomowe wypełnianie projektu

Customization ułatwia pracę z szablonem poprzez **wielopoziomowe wypełnianie całego projektu**, przygotowując zarówno kod jak i dokumentację do natychmiastowej pracy.

#### Poziom 1: Setup Projektu

Customization automatycznie konfiguruje podstawowe ustawienia projektu:

- **package.json** - nazwa projektu, autor, opis, repozytorium
- **README.md** - tytuł, linki do repozytorium i autora
- **LICENSE** - copyright z poprawnym rokiem i autorem
- **.nvmrc** - wersja Node.js
- **.github/FUNDING.yml** - konfiguracja sponsoringu

#### Poziom 2: Customizacja Dokumentacji

Customization automatycznie aktualizuje dokumentację z gotowymi linkami i instrukcjami:

- **Gotowe linki do repozytorium** - wszystkie odnośniki do GitHub są automatycznie wypełnione
- **Instrukcje generowania tokenów** - dokumentacja zawiera miejsca na tokeny z poprawnymi nazwami użytkowników
- **Linki do dokumentacji** - wszystkie wewnętrzne linki są zaktualizowane
- **Przykłady konfiguracji** - dokumentacja zawiera przykłady z poprawnymi danymi projektu

#### Poziom 3: Przygotowanie do Pracy

Po customization projekt jest w pełni gotowy do pracy:

- **Wszystkie placeholdery zastąpione** - nie ma potrzeby ręcznego edytowania
- **Dokumentacja spójna** - wszystkie linki i odnośniki działają
- **Konfiguracja kompletna** - projekt ma poprawną nazwę, autora, wersję
- **Czysty kod** - pliki customization są automatycznie usunięte

### Przykład workflow

```bash
# 1. Sklonuj template
git clone https://github.com/SebastianWesolowski/s-template.git my-project
cd my-project

# 2. Edytuj konfigurację (jeden plik)
# tools/customize/customize.config.ts
{
  placeholder: '{{PLACEHOLDER_REPO_NAME}}',
  value: 'my-awesome-project',
  files: ['package.json', 'README.md']
}

# 3. Uruchom customization (jedna komenda)
yarn customize

# 4. Projekt jest gotowy do pracy:
# ✅ package.json - poprawne dane projektu
# ✅ README.md - poprawne linki do repo
# ✅ Dokumentacja - gotowe instrukcje z tokenami
# ✅ Wszystkie placeholdery zastąpione
```

## Przykłady użycia

### Przykład 1: Nowy projekt

```bash
# 1. Sklonuj template
git clone https://github.com/SebastianWesolowski/s-template.git my-project
cd my-project

# 2. Edytuj konfigurację
# tools/customize/customize.config.ts
{
  placeholder: '{{PLACEHOLDER_REPO_NAME}}',
  value: 'my-awesome-project',
  files: ['package.json', 'README.md'],
}

# 3. Uruchom customization
yarn customize

# 4. Sprawdź rezultat
cat package.json | grep "my-awesome-project"
```

### Przykład 2: Customizacja zaawansowana - własne placeholdery

**Problem:** Chcesz dodać własny placeholder, który nie jest w domyślnej konfiguracji.

**Krok 1: Dodaj placeholder do plików**

Musisz sam zdecydować gdzie placeholder ma występować i dodać go ręcznie do odpowiednich plików:

```typescript
// src/configs/config.ts
export const API_URL = '{{PLACEHOLDER_API_URL}}'

// .env.example
API_URL={{PLACEHOLDER_API_URL}}
```

**Krok 2: Dodaj do konfiguracji**

Edytuj [`tools/customize/customize.config.ts`](../../../tools/customize/customize.config.ts) i dodaj nowy obiekt replacement:

```typescript
{
  placeholder: '{{PLACEHOLDER_API_URL}}',
  value: 'https://api.myproject.com',
  files: ['src/configs/config.ts', '.env.example'], // ← Lista plików gdzie placeholder występuje
}
```

**Ważne:** Musisz sam utrzymywać synchronizację między:

- Miejscami gdzie placeholder występuje w plikach
- Listą plików w konfiguracji (`files`)

Jeśli dodasz placeholder do nowego pliku, musisz też dodać go do `files`. Jeśli usuniesz plik z projektu, usuń go też z `files`.

**Krok 3: Uruchom customization**

```bash
yarn customize
```

**Krok 4: Weryfikacja**

```bash
# Sprawdź czy API URL został zastąpiony
grep -r "https://api.myproject.com" src/

# Sprawdź czy nie ma pozostałych placeholderów
grep -r "PLACEHOLDER_API_URL" .
```

**Uwaga:** System nie zarządza automatycznie własnymi placeholderami - musisz sam dbać o:

- Dodawanie placeholderów do odpowiednich plików
- Aktualizację listy `files` w konfiguracji
- Synchronizację między kodem a konfiguracją

## Troubleshooting

### Problem: Customization fails

**Błąd:** `Validation failed: Missing value for {{PLACEHOLDER_REPO_NAME}}`

```bash
# Sprawdź konfigurację
cat tools/customize/customize.config.ts

# Sprawdź czy wartości są ustawione
grep -A 2 "PLACEHOLDER_REPO_NAME" tools/customize/customize.config.ts
```

**Rozwiązanie:**

```typescript
// Ustaw wartość w konfiguracji
{
  placeholder: '{{PLACEHOLDER_REPO_NAME}}',
  value: 'your-project-name', // ← Dodaj wartość
  files: ['package.json', 'README.md'],
}
```

### Problem: Placeholders not replaced

**Błąd:** `Placeholder "{{PLACEHOLDER_REPO_NAME}}" not found in package.json`

```bash
# Sprawdź czy placeholder jest obecny w pliku
grep "PLACEHOLDER_REPO_NAME" package.json

# Sprawdź czy plik jest w liście files
cat tools/customize/customize.config.ts | grep -A 3 "PLACEHOLDER_REPO_NAME"
```

**Rozwiązanie:**

```typescript
// Dodaj plik do listy files
{
  placeholder: '{{PLACEHOLDER_REPO_NAME}}',
  value: 'your-project-name',
  files: ['package.json', 'README.md', 'LICENSE'], // ← Dodaj LICENSE
}
```

### Problem: File not found

**Błąd:** `File not found: .github/FUNDING.yml for {{PLACEHOLDER_GITHUB_USER}}`

```bash
# Sprawdź czy plik istnieje
ls -la .github/FUNDING.yml

# Sprawdź czy katalog istnieje
ls -la .github/
```

**Rozwiązanie:**

```bash
# Utwórz brakujący plik lub usuń z konfiguracji
mkdir -p .github
touch .github/FUNDING.yml

# Lub usuń z konfiguracji
{
  placeholder: '{{PLACEHOLDER_GITHUB_USER}}',
  value: 'johndoe',
  files: ['package.json', 'README.md'], // ← Usuń .github/FUNDING.yml
}
```

## Wystąpienia

### Pliki domeny

- [`overview.md`](overview.md) — filozofia template customization
- [`technical.md`](technical.md) — scenariusze użycia z linkami do tego przewodnika
- [`reference.md`](reference.md) — kompletna dokumentacja placeholderów i API

### Kontekst DX

- [`../6-developer-experience/technical.md`](../6-developer-experience/technical.md) — customization w ekosystemie DX
- [`../6-developer-experience/overview.md`](../6-developer-experience/overview.md) — Developer Experience overview

### Implementacja

- [`tools/customize/customize.ts`](../../../tools/customize/customize.ts) — główny skrypt customization
- [`tools/customize/customize.config.ts`](../../../tools/customize/customize.config.ts) — konfiguracja placeholderów
- [`tools/customize/type.ts`](../../../tools/customize/type.ts) — definicje typów TypeScript
