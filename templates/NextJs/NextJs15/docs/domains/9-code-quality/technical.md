# Przewodnik techniczny jakości kodu

> [!NOTE] Wystąpienie tematu
> Ten plik łączy narzędzia jakości w spójny workflow i odsyła do plików `tech-*`.
> Source: [overview.md](overview.md)

## Cel dokumentu

Jak w tym projekcie współpracują narzędzia jakości oraz gdzie szukać szczegółów konfiguracji.

## Architektura jakości (synergia)

- ESLint — lint + autofix → zobacz: [tech-eslint.md](tech-eslint.md)
- Prettier — formatowanie kodu → zobacz: [tech-prettier.md](tech-prettier.md)
- Stylelint — linting CSS/SCSS → zobacz: [tech-stylelint.md](tech-stylelint.md)
- TypeScript — ścisłe sprawdzanie typów → zobacz: [tech-typescript.md](tech-typescript.md)
- Husky — bramki pre-commit/pre-push → zobacz: [tech-husky.md](tech-husky.md)
- Commitlint — walidacja commitów → zobacz: [tech-commitlint.md](tech-commitlint.md)
- Knip/Madge — czystość kodu i zależności → zobacz: [tech-knip.md](tech-knip.md), [tech-madge.md](tech-madge.md)

## Minimalny workflow

- **Lokalnie:** IDE (ESLint/Prettier/Stylelint) → pre-commit (lint-staged: Prettier → ESLint → Stylelint → Jest) → prepare-commit-msg (formatowanie + Commitlint) → pre-push (`lint:check` + `test:smoke`)
- **CI:** `lint:check` (TypeScript + ESLint + Prettier + Stylelint) → testy
- Konfiguracje i przykłady: patrz pliki `tech-*` oraz odnośniki poniżej.

**Uwaga:** `type-check` uruchamiany jest w `pre-push` przez `lint:check`, nie w `pre-commit`.

## Rekomendacje (minimalne zmiany)

- Zwiększaj rygor stopniowo — zobacz: [tech-eslint.md](tech-eslint.md) i [overview.md](overview.md#solution) (dual ESLint: standard → strict)
- Nie zmieniaj reguł Prettier — zobacz: [overview.md](overview.md#solution) (twardy standard formatu)
- W Husky włączaj/wyłączaj kroki zamiast usuwać bramki — zobacz: [tech-husky.md](tech-husky.md)

## Konfiguracje w projekcie

Zobacz: [reference.md](reference.md) — kompletna lista lokalizacji konfiguracji.

## Troubleshooting

Zobacz pliki `tech-*`:

- [tech-husky.md](tech-husky.md#troubleshooting) — Git hooks
- [tech-prettier.md](tech-prettier.md#troubleshooting) — formatowanie
- [tech-stylelint.md](tech-stylelint.md#troubleshooting) — stylelint
- [tech-commitlint.md](tech-commitlint.md#troubleshooting) — commitlint
- [tech-typescript.md](tech-typescript.md#troubleshooting) — TypeScript

## Źródła i dokumentacja

- ESLint — https://eslint.org/docs/latest
- Prettier — https://prettier.io/docs/en
- Stylelint — https://stylelint.io/
- TypeScript — https://www.typescriptlang.org/docs
- Husky — https://typicode.github.io/husky/
- Commitlint — https://commitlint.js.org/
- Knip — https://knip.dev
- Madge — https://github.com/pahen/madge

## Wystąpienia

- [overview.md](overview.md) — koncepcja i decyzje
- [tech-eslint.md](tech-eslint.md) — ESLint deep dive
- [tech-prettier.md](tech-prettier.md) — Prettier konfiguracja
- [tech-stylelint.md](tech-stylelint.md) — Stylelint konfiguracja
- [tech-typescript.md](tech-typescript.md) — TypeScript konfiguracja
- [tech-husky.md](tech-husky.md) — Husky Git hooks
- [tech-commitlint.md](tech-commitlint.md) — Commitlint konfiguracja
- [tech-knip.md](tech-knip.md) — Knip unused code detection
- [tech-madge.md](tech-madge.md) — Madge coupling analysis
