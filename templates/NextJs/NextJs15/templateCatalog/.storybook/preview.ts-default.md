import type { Preview } from '@storybook/react';
// import '../src/styles/global.scss';
import '../src/styles/tailwind.scss';
import { themes } from 'storybook/internal/theming';
import React from 'react';

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
      source: {
        state: 'open',
        language: 'tsx',
        format: true,
        className: 'p-4 rounded-md',
      },
      description: {
        component: null,
      },
      canvas: {
        withToolbar: false,
        className: 'border border-gray-300 rounded-md shadow-sm p-4',
      },
      typography: {
        fontSize: '16px',
        lineHeight: 1.6,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '360px', height: '640px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};

// Add global styles to increase spacing between sections
const style = document.createElement('style');
style.innerHTML = `
  .sbdocs-preview {
    margin-bottom: 2.5rem !important;
  }
  .css-1kaktxp {
    margin-bottom: 2.5rem !important;
  }
  .docblock-argstable {
    margin-bottom: 2.5rem !important;
  }
  h3, .docblock-source {
    margin-bottom: 1.5rem !important;
  }
`;
document.head.appendChild(style);

export default preview;
