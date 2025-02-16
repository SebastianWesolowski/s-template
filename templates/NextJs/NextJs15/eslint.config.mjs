import eslintPluginNext from '@next/eslint-plugin-next';
// https://github.com/francoismassart/eslint-plugin-tailwindcss/pull/381
// import eslintPluginTailwindcss from "eslint-plugin-tailwindcss"
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import typescriptEslint from 'typescript-eslint';
import * as fs from 'fs';
import path from 'path';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginSecurity from 'eslint-plugin-security';

const eslintIgnore = [
  '.git/',
  '.next/',
  'node_modules/',
  'dist/',
  'build/',
  'coverage/',
  '*.min.js',
  '*.config.js',
  '*.d.ts',
  'tools/*',
  'sum/*',
];

const config = typescriptEslint.config(
  {
    ignores: eslintIgnore,
    files: ['./src/**/*.+(js|jsx|ts|tsx)', './**/*.test.+(js|jsx|ts|tsx)'],
  },
  {
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  ...eslintPluginStorybook.configs['flat/recommended'],
  //  https://github.com/francoismassart/eslint-plugin-tailwindcss/pull/381
  // ...eslintPluginTailwindcss.configs["flat/recommended"],
  typescriptEslint.configs.recommended,
  typescriptEslint.configs.recommendedTypeChecked,
  eslintPluginImport.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': eslintPluginNext,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      'unused-imports': eslintPluginUnusedImports,
      security: eslintPluginSecurity,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,

      // Next.js specific rules
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/no-page-custom-font': 'error',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Security rules
      'security/detect-non-literal-regexp': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-new-buffer': 'error',
      'security/detect-object-injection': 'warn',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-bidi-characters': 'error',

      // Import rules
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'import/first': 'error',
      'import/no-cycle': 'error',

      // Unused imports
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Basic security rules
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': [
        'warn',
        {
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            ...getDirectoriesToSort().map((singleDir) => ({
              pattern: `${singleDir}/**`,
              group: 'internal',
            })),
            {
              pattern: 'env',
              group: 'internal',
            },
            {
              pattern: 'theme',
              group: 'internal',
            },
            {
              pattern: 'public/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },

      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            ...getDirectoriesToSort().map((singleDir) => ({
              pattern: `${singleDir}/**`,
              group: 'internal',
            })),
            {
              pattern: 'env',
              group: 'internal',
            },
            {
              pattern: 'theme',
              group: 'internal',
            },
            {
              pattern: 'public/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }
);

function getDirectoriesToSort() {
  const ignoredSortingDirectories = ['.git', '.next', '.vscode', 'node_modules', '.cache', 'public'];

  try {
    return fs
      .readdirSync(process.cwd())
      .filter((file) => {
        try {
          return fs.statSync(path.join(process.cwd(), file)).isDirectory();
        } catch (error) {
          console.warn(`Błąd podczas sprawdzania katalogu ${file}:`, error);
          return false;
        }
      })

      .filter((f) => !ignoredSortingDirectories.includes(f));
  } catch (error) {
    console.error('Błąd podczas listowania katalogów:', error);
    return [];
  }
}

export default config;
