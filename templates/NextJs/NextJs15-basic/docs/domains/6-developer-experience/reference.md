# Developer Experience Reference

> [!TIP] Single Source of Truth
> Kompletna dokumentacja API, konfiguracji i command reference.
> Wystąpienia: [overview.md](overview.md), [technical.md](technical.md)

## Scripts Reference

**Development Scripts:**

Zobacz: [package.json](../../../package.json) - wszystkie development scripts

**Key DX Scripts:**

- `yarn customize` - Template customization (właściciel: [2-customization](../2-customization/))
- `yarn lint` - Code quality checks (właściciel: [9-code-quality](../9-code-quality/))
- `yarn test` - Testing suite (właściciel: [10-testing](../10-testing/))
- `yarn build:analyze` - Bundle analysis (właściciel: [11-performance](../11-performance/))

## Tool Configuration

Narzędzia DX są skonfigurowane w domenach właścicieli:

**Code Quality:**

- ESLint → [9-code-quality/reference.md](../9-code-quality/reference.md)
- Prettier → [9-code-quality/tech-prettier.md](../9-code-quality/tech-prettier.md)
- TypeScript → [9-code-quality/tech-typescript.md](../9-code-quality/tech-typescript.md)

**Testing:**

- Jest → [10-testing/reference.md](../10-testing/reference.md)
- Playwright → [10-testing/tech-playwright.md](../10-testing/tech-playwright.md)
- Storybook → [10-testing/tech-storybook.md](../10-testing/tech-storybook.md)

**Build & Deploy:**

- GitHub Actions → [15-deployment/tech-github-actions.md](../15-deployment/tech-github-actions.md)
- Semantic Release → [15-deployment/tech-semantic-release.md](../15-deployment/tech-semantic-release.md)

**Dependencies:**

- Renovate → [4-dependencies/tech-renovate.md](../4-dependencies/tech-renovate.md)
- s-update-manager → [4-dependencies/tech-s-update-manager.md](../4-dependencies/tech-s-update-manager.md)

## Wystąpienia

- [overview.md](overview.md) — filozofia DX
- [technical.md](technical.md) — ekosystem DX
