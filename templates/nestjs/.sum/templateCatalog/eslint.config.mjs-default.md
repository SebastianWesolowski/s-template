import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import * as fs from 'fs';
import path from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import * as typescriptEslint from 'typescript-eslint';

export const eslintIgnore = [
  '.git/',
  'node_modules/',
  'dist/',
  'build/',
  'coverage/',
  '*.min.js',
  '*.config.js',
  '*.d.ts',
  'tools/*',
  '.sum/*',
  'eslint.config.mjs',
  'eslint.config.strict.mjs',
  'clean-package.config.json',
  'lib/',
  'package.json',
  'prettier.config.js',
  'tsconfig.json',
  '.eslintrc.js',
  '.husky',
  '.commitlintrc.js',
  '.releaserc.js',
  'tools/addDependency.js',
  'tools/addModuleType.js',
  'tools/ngrok-auth.js',
];

export const eslintFiles = ['./src/**/*.+(js|ts)', './**/*.test.+(js|ts)'];

export const typescriptEslintConfig = {
  languageOptions: {
    parser: typescriptEslint.parser,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: process.cwd(),
    },
  },
  ignores: eslintIgnore,
};

export const jsEslint = {
  files: ['*.js', '*.mjs'],
  ignores: ['eslint.config.mjs', 'eslint.config.strict.mjs'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};

export const eslintPluginImportConfig = {
  ...eslintPluginImport.flatConfigs.recommended,
};

export const eslintPluginsConfig = {
  'unused-imports': eslintPluginUnusedImports,
  security: eslintPluginSecurity,
};

export const eslintSettings = {
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
      project: './tsconfig.json',
    },
    node: true,
  },
};

export const typescriptEslintConfigRecommended = typescriptEslint.configs.recommended;

const config = [
  {
    ignores: eslintIgnore,
  },
  ...typescriptEslintConfigRecommended,
  {
    files: eslintFiles,
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
      security: eslintPluginSecurity,
      '@typescript-eslint': typescriptEslint.plugin,
      import: eslintPluginImport,
    },
    rules: {
      'security/detect-eval-with-expression': 'warn',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'warn',
      'import/first': 'warn',
      'import/no-cycle': 'warn',
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
      'no-eval': 'warn',
      'no-implied-eval': 'warn',
      'no-new-func': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'sort-imports': 'warn',
      'import/order': 'warn',
    },
  },
  {
    files: ['*.js', '*.mjs'],
    ignores: ['eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    settings: eslintSettings,
    plugins: {
      import: eslintPluginImport,
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
        'warn',
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
];

export function getDirectoriesToSort() {
  const ignoredSortingDirectories = ['.git', '.vscode', 'node_modules', '.cache', 'public'];

  try {
    return fs
      .readdirSync(process.cwd())
      .filter((file) => {
        try {
          return fs.statSync(path.join(process.cwd(), file)).isDirectory();
        } catch (error) {
          console.warn(`Error checking directory ${file}:`, error);
          return false;
        }
      })
      .filter((f) => !ignoredSortingDirectories.includes(f));
  } catch (error) {
    console.error('Error listing directories:', error);
    return [];
  }
}

export default config;
