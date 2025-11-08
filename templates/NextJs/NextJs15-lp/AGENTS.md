# AGENTS.md

Instructions for AI coding agents working on this project.

## Project Overview

This is a Next.js 15 template with TypeScript, Tailwind CSS, and comprehensive tooling for code quality, testing, and documentation.

## Development Commands

### Setup

- Install dependencies: `yarn install`
- Install Playwright browsers: `yarn playwright:install`

### Development

- Start dev server: `yarn dev` (runs on `http://localhost:3000`)
- Start Storybook: `yarn storybook` (runs on `http://localhost:6006`)
- Build project: `yarn build`
- Start production server: `yarn next:start`

### Testing

- Run all tests: `yarn test`
- Unit tests only: `yarn test:unit`
- Component tests: `yarn test:components`
- E2E tests: `yarn test:e2e`
- E2E tests UI: `yarn test:e2e:ui`
- Watch mode: `yarn test:unit:watch`
- Update snapshots: `yarn test:snapshot`

### Linting & Code Quality

- Check code quality: `yarn lint`
- Type checking: `yarn lint:typescript:check`
- ESLint: `yarn lint:eslint:check`
- Prettier check: `yarn lint:prettier:check`
- Stylelint: `yarn lint:style:check`
- Fix all auto-fixable issues: `yarn lint:fix`

### Quality Tools

- Check for unused code: `yarn quality:knip`
- Generate coverage report: `yarn quality:coverage`
- Coupling graph: `yarn quality:coupling:graph`

## Code Style

### TypeScript

- Strict mode enabled in `tsconfig.json`
- Use TypeScript for all `.ts` and `.tsx` files
- Avoid `any` types

### Code Style Rules

- **Quotes**: Single quotes for strings
- **Semicolons**: Do NOT use semicolons
- **Trailing commas**: Yes
- **Indentation**: 2 spaces
- **Line length**: Max 100 characters (Prettier handles this)
- **Imports**: Use absolute imports from `src/`
- **Functional patterns**: Prefer functional components and patterns

### Formatting

- Use Prettier for all formatting (`yarn lint:prettier:fix`)
- Format on save is recommended

### Naming Conventions

- **Files**: PascalCase for components (`Button.tsx`), camelCase for utils (`formatPrice.ts`)
- **Components**: PascalCase (`const MyComponent`)
- **Variables/functions**: camelCase (`const myVariable`)
- **Constants**: UPPER_SNAKE_CASE (`const API_URL`)
- **Types/Interfaces**: PascalCase (`type MyType`)

## File Structure

- `src/` - Application source code
- `src/app/` - Next.js App Router pages
- `src/components/` - React components (organized by feature)
- `src/configs/` - Configuration files
- `src/styles/` - Global styles
- `src/utils/` - Utility functions
- `docs/` - Documentation
- `docs/domains/` - Domain documentation structure
- `e2e/` - Playwright E2E tests
- `public/` - Static assets

## Testing Instructions

### Before Committing

1. Run `yarn lint` - must pass with no errors
2. Run `yarn test` - all tests must pass
3. Check TypeScript: `yarn lint:typescript:check`

### Adding Tests

- **Components**: Add tests in `src/components/**/*.test.tsx`
- **Utils**: Add tests in `src/utils/**/*.test.ts`
- **E2E**: Add tests in `e2e/**/*.spec.ts`
- Use `@testing-library/react` for component tests
- Use Playwright for E2E tests

### Test Patterns

- Use descriptive test names: `it('should render button with correct text')`
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies
- Test user interactions, not implementation details

## Git Workflow

### Commit Messages

- Use conventional commits format
- Run `yarn commit` for interactive commit creation
- Prefix with type: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, etc.
- Examples:
  - `feat: add user authentication`
  - `fix: resolve memory leak in component`
  - `docs: update API documentation`

### Pre-commit Hooks

- Husky runs `lint-staged` automatically
- Runs Prettier, ESLint on staged files
- Runs tests before push

### Branch Naming

- Feature: `feature/SC-123-branch-name`
- Bugfix: `bugfix/SC-456-branch-name`
- Hotfix: `hotfix/SC-789-urgent-fix`

## Documentation

### Project Documentation

- Main documentation: `docs/INDEX.md`
- Domain docs: `docs/domains/`
- For documentation guidelines: `docs/domains/AGENTS.md`

### Code Comments

- Use JSDoc for functions/components
- Explain WHY, not WHAT
- Update comments when code changes

## Security Considerations

- Never commit API keys or secrets
- Use environment variables (`.env.local`)
- Validate user input
- Check dependencies with `yarn audit`
- Follow OWASP guidelines for web security

## Common Tasks

### Adding a New Component

1. Create folder: `src/components/ComponentName/`
2. Create `ComponentName.tsx`
3. Export from `src/components/index.ts`
4. Add story in Storybook
5. Add tests in `ComponentName.test.tsx`

### Adding Environment Variables

1. Add to `env.mjs` with Zod schema
2. Add to `.env.example`
3. Document in `docs/domains/3-environment/`

### Updating Dependencies

1. Run `yarn upgrade-interactive`
2. Test thoroughly
3. Check for breaking changes
4. Update docs if needed

## Troubleshooting

### "Module not found" Errors

- Check import paths (use absolute `src/` paths)
- Run `yarn install` again
- Clear `.next` cache: `rm -rf .next`

### Type Errors

- Run `yarn lint:typescript:check`
- Check `@types/` packages are installed
- Verify `tsconfig.json` paths

### Test Failures

- Run tests individually to isolate issue
- Update snapshots: `yarn test:snapshot`
- Check `jest.setup.js` configuration

### Build Failures

- Check Node version: `node >= 18.x`
- Clear caches: `rm -rf .next node_modules/.cache`
- Reinstall: `rm -rf node_modules yarn.lock && yarn install`

## Environment Setup

- **Node**: >= 18.x (check with `node -v`)
- **Package Manager**: yarn (preferred) or npm
- **Editor**: VS Code recommended
- **Extensions**: ESLint, Prettier, Tailwind CSS IntelliSense

## References

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Testing Library Docs](https://testing-library.com)
- [Playwright Docs](https://playwright.dev)
