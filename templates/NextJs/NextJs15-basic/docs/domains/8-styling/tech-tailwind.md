# Tailwind CSS

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

- Konfiguracja: [tailwind.config.ts](../../../tailwind.config.ts)
- Globalne style i dystrybucja utili: [src/styles/](../../../src/styles/)
- Dark mode: `darkMode: 'class'` — używaj z `next-themes` (zob. [technical.md](technical.md) → Storybook/Theme)
- Tokeny i kolory: CSS variables w `:root` i `body.dark` → mapowane do `theme.extend.colors`
- Plugins: `@tailwindcss/typography`, `tailwindcss-animate`

## Konwencje

- Preferuj utility-first; SASS/CSS modules tylko „by exception” i dokumentuj w kodzie
- Używaj `cn()` do łączenia klas; warianty przez CVA (link: [tech-cva.md](tech-cva.md))
- Zachowuj spójność `primary`/accent w jednym miejscu (tylko `tailwind.config.ts`)

## VS Code Color Sync (custom)

- Automatyczna synchronizacja kolorów paska bocznego VS Code z `primary.500` — [tools/updateVSCodeColors.js](../../../tools/updateVSCodeColors.js)

## See also

- [technical.md](technical.md) — workflow i integracje
- [tech-cva.md](tech-cva.md) — warianty i konwencje
- [tech-shadcn.md](tech-shadcn.md) — integracja biblioteki komponentów

## Wystąpienia

- [`tailwind.config.ts`](../../../tailwind.config.ts) — konfiguracja (SSoT)
- [`src/styles/`](../../../src/styles/) — globalne style
- [`prettier.config.js`](../../../prettier.config.js) — sortowanie klas/importów
