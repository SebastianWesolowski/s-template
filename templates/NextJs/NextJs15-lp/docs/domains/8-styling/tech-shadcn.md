# shadcn/ui

> [!NOTE] Wystąpienie tematu
> Szczegółowy przewodnik implementacji.
> Źródło koncepcji: [overview.md](overview.md)

- Status: Docelowa biblioteka UI (migracja w toku)
- Zasada: copy-paste + pełna kontrola kodu, stylowanie Tailwind + CVA

## Konfiguracja (Projekt)

- `components.json` — ścieżki, aliasy, Tailwind:
  - `tailwind.config.ts`, `src/styles/global.scss`
  - Aliasy: `@/components`, `@/utils`
- Dodawanie komponentów przez CLI (per potrzeba) — bez listy w tym pliku

## Conventions

- Warianty zawsze przez CVA (patrz [tech-cva.md](tech-cva.md))
- Importy klas przez `cn()`
- Trzymaj tokeny koloru w Tailwind, a nie w komponentach

## Customizacja

- Możesz forknąć dowolny komponent i dostosować warianty pod projekt
- Niestandardowe komponenty (np. StatusBadge) dokumentuj przy komponencie (JSDoc) — nie duplikuj tutaj

## See also

- [technical.md](technical.md) — workflow
- [tech-tailwind.md](tech-tailwind.md) — tokeny i plugins
- [tech-cva.md](tech-cva.md) — warianty

## Wystąpienia

- [`components.json`](../../../components.json)
- [`src/ui/`](../../../src/ui/)
