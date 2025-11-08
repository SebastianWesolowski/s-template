# Husky Git Hooks

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)
## Rola Husky w projekcie

Bramki jakości przed commitem/push. Automatyczna synchronizacja branchy, formatowanie commitów, kontrola jakości kodu przez lint-staged. Integracja z ESLint, Prettier, TypeScript, Commitlint.

## Hooki w projekcie

### pre-commit

Synchronizacja z main/remote, lint-staged, update snapshotów, synchronizacja kolorów Tailwind → VS Code.

**Główne funkcje:**

- Sprawdza czy branch jest zsynchronizowany z `origin/main`
- Sprawdza czy branch jest zsynchronizowany z własnym remote
- Uruchamia `yarn husky:pre-commit` → lint-staged (ESLint, Prettier, Jest na staged files)
- Aktualizuje snapshoty testów i dodaje je do commita
- Jeśli zmieniono `tailwind.config.ts`, aktualizuje VS Code colors

**Szczegóły:** Zobacz [`.husky/pre-commit`](../../../.husky/pre-commit) — pełna implementacja z branch sync i snapshot management

### prepare-commit-msg

Autoformatowanie wiadomości commita przez czg (Commitizen) — emoji, SC-XXX, typ.

**Główne funkcje:**

- Automatycznie formatuje: `type: emoji [SC-XXX] description`
- Uruchamia wizard (`yarn commit`) jeśli potrzebny
- Pomija dla amend commits

**Szczegóły:** Zobacz [`.husky/prepare-commit-msg`](../../../.husky/prepare-commit-msg) — logika extract/format commit message

**Walidacja Commitlint:** Zobacz [tech-commitlint.md](tech-commitlint.md) — pełna dokumentacja Commitlint

### pre-push

Wykonuje pełną walidację przed push.

**Funkcja:**

- Uruchamia `yarn husky:pre-push` → `lint:check` + `test:smoke`

**Szczegóły:** Zobacz [`.husky/pre-push`](../../../.husky/pre-push) oraz [package.json](../../../package.json) (linie 54-56)

### post-merge

Automatycznie instaluje zależności po merge/pull.

**Funkcja:**

- Uruchamia `yarn` po zakończeniu merge

**Szczegóły:** Zobacz [`.husky/post-merge`](../../../.husky/post-merge)

## Lint-staged

Selektywne lintowanie tylko staged files podczas pre-commit.

**Konfiguracja:** Zobacz [`.husky/lint-staged.config.json`](../../../.husky/lint-staged.config.json)

**Co robi (kolejność wykonania):**

- `*.{js,jsx,ts,tsx}` → Prettier write → ESLint fix → Jest (related tests)
- `*.{json,md,yml}` → Prettier write
- `*.{css,scss,sass}` → Stylelint fix

**Uwaga:** Kolejność jest ważna — Prettier formatuje przed ESLint, aby uniknąć konfliktów.

## Skrypty w package.json

Hooki wywołują skrypty `husky:*`:

```json
"husky:pre-commit": "lint-staged -c ./.husky/lint-staged.config.json",
"husky:pre-push": "run-p lint:check test:smoke",
"husky:prepare-commit-msg": "exec < /dev/tty && yarn commit --hook || true"
```

**Szczegóły:** Zobacz [package.json](../../../package.json) (linie 54-56, 58)

## Jak dostosować

### Modyfikacja hooków

1. Edytuj pliki w [`.husky/`](../../../.husky/)
2. Albo modyfikuj skrypty `husky:*` w `package.json` (pre-commit/pre-push)

### Modyfikacja lint-staged

Edytuj [`.husky/lint-staged.config.json`](../../../.husky/lint-staged.config.json) — zmień patterny lub dodaj nowe kroki.

### Wyłączanie hooków (tylko wyjątki)

- `git commit --no-verify` — pomija pre-commit i prepare-commit-msg
- `git push --no-verify` — pomija pre-push

**⚠️ Używaj oszczędnie** — hooki są po to, aby utrzymać jakość.

## Troubleshooting

- Hook nie działa? → Sprawdź `npx husky --version`, `ls -la .husky/`
- Debug hooka? → Dodaj `set -x` na początku hooka lub uruchom `bash -x .husky/pre-commit`
- Lint-staged za wolne? → Konfiguracja już ogranicza się do staged files; możesz zawęzić patterny w config

**Reference:** Zobacz [`.husky/README.md`](../../../.husky/README.md) — lokalna dokumentacja hooków

## Wystąpienia

- [overview.md](overview.md) — kontekst i decyzje
- [technical.md](technical.md) — synergia narzędzi
- [tech-eslint.md](tech-eslint.md) — integracja ESLint
- [tech-prettier.md](tech-prettier.md) — integracja Prettier
- [tech-stylelint.md](tech-stylelint.md) — integracja Stylelint (lint-staged)
- [tech-commitlint.md](tech-commitlint.md) — walidacja commitów
- [6-developer-experience/technical.md](../6-developer-experience/technical.md) — DX workflow

## Oficjalna dokumentacja

- Husky — https://typicode.github.io/husky/
- lint-staged — https://github.com/lint-staged/lint-staged
- Commitlint — https://commitlint.js.org/ (zobacz [tech-commitlint.md](tech-commitlint.md))
- Conventional Commits — https://www.conventionalcommits.org/
