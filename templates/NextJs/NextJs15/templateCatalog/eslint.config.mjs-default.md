import eslintPluginNext from '@next/eslint-plugin-next';
// https://github.com/francoismassart/eslint-plugin-tailwindcss/pull/381
// import eslintPluginTailwindcss from "eslint-plugin-tailwindcss"
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import * as fs from 'fs';
import path from 'path';
import typescriptEslint from 'typescript-eslint';

export const eslintIgnore = [
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
  'eslint.config.mjs',
  'eslint.config.strict.mjs',
  '.storybook/*.ts',
];
export const eslintFiles = ['./src/**/*.+(js|jsx|ts|tsx)', './**/*.test.+(js|jsx|ts|tsx)'];
export const typescriptEslintConfig = {
  languageOptions: {
    parser: typescriptEslint.parser,
    parserOptions: {
      project: true,
      tsconfigRootDir: process.cwd(),
    },
  },
  ignores: eslintIgnore,
};

export const jsEslint = {
  files: ['*.js', '*.mjs'],
  ignores: ['eslint.config.mjs', 'eslint.config.strict.mjs', 'next-sitemap.config.js', 'src/configs/configBasic.js'],
  languageOptions: {
    parser: 'espree',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
};

export const eslintStorybookConfig = eslintPluginStorybook.configs['flat/recommended'];

export const eslintPluginImportConfig = {
  ...eslintPluginImport.flatConfigs.recommended,
};

export const eslintPluginsConfig = {
  '@next/next': eslintPluginNext,
  'react-hooks': eslintPluginReactHooks,
  'jsx-a11y': eslintPluginJsxA11y,
  'unused-imports': eslintPluginUnusedImports,
  security: eslintPluginSecurity,
};

export const eslintSettings = {
  tailwindcss: {
    callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
  },

  'import/resolver': {
    typescript: true,
    node: true,
  },
};

export const typescriptEslintConfigRecommended = typescriptEslint.configs.recommended;
export const typescriptEslintConfigRecommendedTypeChecked = typescriptEslint.configs.recommendedTypeChecked;

const config = typescriptEslint.config(
  {
    ignores: eslintIgnore,
    files: eslintFiles,
  },
  { ...typescriptEslintConfig },
  typescriptEslintConfigRecommended,
  typescriptEslintConfigRecommendedTypeChecked,
  jsEslint,
  ...eslintStorybookConfig,
  //  https://github.com/francoismassart/eslint-plugin-tailwindcss/pull/381
  // ...eslintPluginTailwindcss.configs["flat/recommended"],
  eslintPluginImportConfig,
  {
    plugins: eslintPluginsConfig,
    rules: {
      // Next.js specific rules
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'warn',
      '@next/next/google-font-display': 'warn',
      '@next/next/no-page-custom-font': 'warn',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // Security rules - keeping only basic ones
      'security/detect-eval-with-expression': 'warn',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-non-literal-regexp': 'warn',

      // Import rules
      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'warn',
      'import/first': 'warn',
      'import/no-cycle': 'warn',

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
      'no-eval': 'warn',
      'no-implied-eval': 'warn',
      'no-new-func': 'warn',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // JSX rules
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',

      // Console rules
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

      // TypeScript rules
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

      // Simplified import sorting
      'sort-imports': 'warn',
      'import/order': 'warn',
    },
  },
  {
    settings: eslintSettings,
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

export function getDirectoriesToSort() {
  const ignoredSortingDirectories = ['.git', '.next', '.vscode', 'node_modules', '.cache', 'public'];

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
