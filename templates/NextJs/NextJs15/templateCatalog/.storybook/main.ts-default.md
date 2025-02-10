import type { StorybookConfig } from '@storybook/nextjs';
import { existsSync } from 'fs';
import { resolve } from 'path';

const publicDirExists = existsSync(resolve(__dirname, '../public'));

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  ...(publicDirExists && { staticDirs: ['../public'] }),
  typescript: {
    check: true,
    checkOptions: {
      typescript: {
        configFile: 'tsconfig.json',
      },
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      include: ['../components/**/*.{ts,tsx}', '../app/**/*.{ts,tsx}'],
    },
  },
  features: {
    argTypeTargetsV7: true,
    disallowImplicitActionsInRenderV8: true,
    viewportStoryGlobals: true,
    backgroundsStoryGlobals: true,
    legacyDecoratorFileOrder: false,
  },
};

export default config;
