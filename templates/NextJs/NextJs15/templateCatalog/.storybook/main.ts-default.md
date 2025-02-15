import type { StorybookConfig } from '@storybook/nextjs';
import { existsSync } from 'fs';
import { resolve } from 'path';

const publicDirExists = existsSync(resolve(__dirname, '../public'));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
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
      include: [
        '../src/components/**/*.{ts,tsx}',
        '../src/app/**/*.{ts,tsx}',
        '../src/utils/**/*.{ts,tsx}',
        '../src/lib/**/*.{ts,tsx}',
        '../src/configs/**/*.{ts,tsx}',
        '../src/assets/**/*.{ts,tsx}',
      ],
    },
  },
  features: {
    argTypeTargetsV7: true,
    disallowImplicitActionsInRenderV8: true,
    viewportStoryGlobals: true,
    backgroundsStoryGlobals: true,
    legacyDecoratorFileOrder: false,
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.(css|scss|sass)$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['tailwindcss', 'autoprefixer'],
            },
          },
        },
        'sass-loader',
      ],
    });

    return config;
  },
};

export default config;
