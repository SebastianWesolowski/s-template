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
        fsCache: false,
      },
    },
  },
  // docs: {
  //   autodocs: 'tag',
  // },
  staticDirs: ['../public'],
  typescript: {
    check: true,
    checkOptions: {
      typescript: {
        configFile: 'tsconfig.json',
      },
    },
    // reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   shouldExtractLiteralValuesFromEnum: true,
    //   propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    //   include: [
    //     '../src/components/**/*.{ts,tsx}',
    //     '../src/app/**/*.{ts,tsx}',
    //     '../src/utils/**/*.{ts,tsx}',
    //     '../src/lib/**/*.{ts,tsx}',
    //     '../src/configs/**/*.{ts,tsx}',
    //     '../src/assets/**/*.{ts,tsx}',
    //   ],
    // },
  },
  features: {
    argTypeTargetsV7: true,
    disallowImplicitActionsInRenderV8: true,
    viewportStoryGlobals: true,
    backgroundsStoryGlobals: true,
    legacyDecoratorFileOrder: false,
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  webpackFinal: async (config) => {
    // Find and modify the sass-loader configuration
    config.module?.rules?.forEach((rule: any) => {
      if (rule?.test?.toString().includes('sass') || rule?.test?.toString().includes('scss')) {
        const sassLoader = rule.use?.find((loader: any) => loader?.loader?.includes('sass-loader'));
        if (sassLoader) {
          sassLoader.options = {
            ...sassLoader.options,
            sassOptions: {
              ...sassLoader.options?.sassOptions,
              silenceDeprecations: ['legacy-js-api'],
            },
          };
        }
      }
    });
    return config;
  },
};

export default config;
