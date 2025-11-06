# Code Quality Reference

> [!TIP] Single Source of Truth
> Ten plik zbiera wyłącznie referencje: gdzie znajdują się konfiguracje i jak je uruchamiać. Bez duplikowania treści z `technical.md`/`tech-*.md`.

## Lokalizacje konfiguracji

- [`eslint.config.mjs`](../../../eslint.config.mjs) — konfiguracja ESLint (profil standard)
- [`eslint.config.strict.mjs`](../../../eslint.config.strict.mjs) — konfiguracja ESLint (profil strict)
- [`prettier.config.js`](../../../prettier.config.js) — konfiguracja Prettier
- [`stylelint.config.js`](../../../stylelint.config.js) — konfiguracja Stylelint
- [`tsconfig.json`](../../../tsconfig.json) — konfiguracja TypeScript
- [`.commitlintrc.js`](../../../.commitlintrc.js) — konfiguracja Commitlint
- [`.husky/`](../../../.husky/) — Git hooks (pre-commit, prepare-commit-msg, pre-push)
- [`package.json`](../../../package.json) — skrypty jakości (ESLint, Prettier, Stylelint, TS, Husky, Lint-staged)

## Kluczowe skrypty (package.json)

- Lint (ESLint): `yarn lint`, `yarn lint:eslint:check`, `yarn lint:eslint:fix`
- Format (Prettier): `yarn lint:prettier:check`, `yarn lint:prettier:fix`
- Type-check (TS): `yarn lint:typescript:check`
- Stylelint: `yarn lint:style:check`, `yarn lint:style:fix`
- Husky hooks: `husky:*` skrypty i `prepare`
- Lint-staged: wywoływane z Husky (`pre-commit`)
- Dodatkowe narzędzia jakości: `yarn quality:knip`, `yarn quality:coupling:graph`, `yarn quality:coupling:json`, `yarn quality:coverage`

## Uruchamianie lokalne

```bash
# Lint + format + type-check (pełny pakiet)
yarn lint

# Tylko ESLint / Prettier / TS
yarn lint:eslint:check
yarn lint:prettier:check
yarn lint:typescript:check
```

## Hooki Git (Husky)

Zobacz: [tech-husky.md](tech-husky.md) — szczegółowy opis hooków i workflow.

## Wystąpienia

- [overview.md](overview.md) — filozofia code quality
- [technical.md](technical.md) — implementacja i workflow jakości
- [tech-eslint.md](tech-eslint.md) — ESLint konfiguracja
- [tech-prettier.md](tech-prettier.md) — Prettier konfiguracja
- [tech-stylelint.md](tech-stylelint.md) — Stylelint konfiguracja
- [tech-typescript.md](tech-typescript.md) — TypeScript konfiguracja
- [tech-husky.md](tech-husky.md) — Husky i Git hooks
- [tech-commitlint.md](tech-commitlint.md) — Commitlint konfiguracja
- [tech-knip.md](tech-knip.md) — Knip konfiguracja
- [tech-madge.md](tech-madge.md) — Madge konfiguracja
