# cz-git Configuration

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

cz-git to oficjalny adapter dla commitizen, specjalnie zaprojektowany dla `.commitlintrc.js` konfiguracji. Zapewnia płynną integrację między commitizen wizard (czg) i commitlint validation.

Dlaczego cz-git zamiast standardowego commitizen? Zobacz: [Issue Tracking Overview - Decyzje Architektoniczne](overview.md#dlaczego-cz-git-zamiast-standardowego-commitizen)

## Configuration Deep Dive

Kompletna konfiguracja w [`.commitlintrc.js`](../../../.commitlintrc.js).

### Kluczowe opcje w projekcie

**prompt.types** - lista typów commitów z emoji
**prompt.skipQuestions** - pomija pytań dla szybszego workflow
**prompt.formatMessageCB** - custom formatting dla SC-XXX prefix

Szczegóły opcji: [cz-git documentation](https://github.com/Zhengqbbb/cz-git#prompt).

## Customization Examples

### 1. Dodanie Custom Type

Dodaj nowy typ do `prompt.types` array i do `rules.type-enum`.

**Reference:** [cz-git types](https://github.com/Zhengqbbb/cz-git#types)

### 2. Zmiana Emoji

Edytuj `emoji` property w obiekcie type w `prompt.types`.

**Reference:** [cz-git emoji](https://github.com/Zhengqbbb/cz-git#emoji)

### 3. Custom Scope Workflow

Użyj `prompt.scopes` array dla predefiniowanych lub `allowCustomScopes: true` dla dowolnych.

**Reference:** [cz-git scopes](https://github.com/Zhengqbbb/cz-git#scopes)

### 4. Custom Issue Prefix

Dodaj `formatMessageCB` do `prompt` z custom logic.

**Reference:** [cz-git formatMessageCB](https://github.com/Zhengqbbb/cz-git#formatmessagecb)

## Advanced Usage

### skipQuestions, useAI, i inne opcje

Szczegóły wszystkich opcji: [cz-git options](https://github.com/Zhengqbbb/cz-git#options).

Aktualnie używamy: `skipQuestions` (pomija body, scope, breaking dla szybszego workflow).

## Best Practices

### 1. Type Naming

- Używaj lowercase dla values: `feat`, `fix`, nie `Feat`, `FIX`
- Używaj short names: `perf` zamiast `performance`
- Używaj descriptive names dla devs: `migrate` zamiast `mig`

### 2. Emoji Selection

- Używaj jednoznacznych emoji (✨ zamiast star-emoji które może nie renderować się)
- Zachowaj spójność emoji dla podobnych akcji (np. all CI/CD related = 🎡)
- Testuj emoji rendering w terminalu (nie wszystkie emoji support)

### 3. Scope Guidelines

**Jeśli allowCustomScopes: true (current setup):**

- Devs mogą wpisać dowolny scope
- Trust devs o sensownych scope names
- Document conventions w CODE.md

**Jeśli allowCustomScopes: false:**

- Trzymaj listę krótką i aktualną
- Usuwaj scopes które nie są używane
- Dodawaj scopes based on project modules

## Wystąpienia

- [`overview.md`](overview.md) — koncepcja issue tracking i decyzje architektoniczne
- [`technical.md`](technical.md) — jak używać cz-git wizard
- [`reference.md`](reference.md) — kompletna referencja .commitlintrc.js i komend
- [`README.md`](README.md) — Quick Start dla issue tracking
- [`memory-bank/workflows.md`](../../../memory-bank/workflows.md) — skrót cz-git dla AI
- [`.commitlintrc.js`](../../../.commitlintrc.js) — Commitlint config (reference)
- [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg) — Git hook (reference)
