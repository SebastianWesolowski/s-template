import type { Meta, StoryObj } from '@storybook/react';
import { AnalyticsUtils } from './Analytics';

/**
 * Mock for production environment to show analytics in Storybook
 */
const isProductionEnv = true; // Instead of trying to modify NODE_ENV directly

/**
 * Wrapper component to display utils output for Storybook
 */
const AnalyticsWrapper = ({
  disableInDevelopment,
  showUtils = true,
}: {
  disableInDevelopment?: boolean;
  showUtils?: boolean;
}) => {
  return (
    <div className='rounded-md bg-gray-100 p-4'>
      <h3 className='mb-4 text-lg font-semibold'>Analytics Utility Component</h3>

      <div className='mb-4'>
        <strong>Component Implementation:</strong>
        <pre className='mt-2 rounded bg-gray-200 p-2 text-xs'>
          {`<Analytics disableInDevelopment={${disableInDevelopment}} />`}
        </pre>
      </div>

      {showUtils && (
        <div>
          <strong>Utility Functions Output:</strong>
          <div className='mt-2 rounded bg-gray-200 p-2 text-xs'>
            <div>
              <strong>shouldEnableAnalytics():</strong> {(!disableInDevelopment || isProductionEnv).toString()}
            </div>
            <div className='mt-2'>
              <strong>getActiveProviders():</strong> {JSON.stringify(AnalyticsUtils.getActiveProviders())}
            </div>
          </div>
        </div>
      )}

      <div className='mt-4 rounded bg-blue-100 p-2'>
        <strong>Note:</strong> This is a non-visual utility component that loads analytics scripts.
        <br />
        The actual Analytics component would inject scripts into the page.
      </div>

      {/* Actual component is not rendered in Storybook since it injects scripts */}
    </div>
  );
};

/**
 * Analytics utility component Storybook configuration
 */
const meta: Meta<typeof AnalyticsWrapper> = {
  title: 'Utilities/Analytics',
  component: AnalyticsWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A utility component for integrating analytics providers in Next.js applications. This is a non-visual component that injects analytics scripts into the page.',
      },
    },
  },
  argTypes: {
    disableInDevelopment: {
      control: 'boolean',
      description: 'Whether to disable analytics in development environment',
      defaultValue: true,
    },
    showUtils: {
      control: 'boolean',
      description: 'Show utility function outputs in Storybook',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnalyticsWrapper>;

// Stories
export const Default: Story = {
  args: {
    disableInDevelopment: true,
    showUtils: true,
  },
};

export const EnabledInDevelopment: Story = {
  args: {
    disableInDevelopment: false,
    showUtils: true,
  },
};

export const UtilsOnly: Story = {
  args: {
    showUtils: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story shows only the utility functions output without the component implementation.',
      },
    },
  },
};

// Add a story that demonstrates how to use the Analytics with custom config
export const WithCustomConfig: Story = {
  args: {
    disableInDevelopment: true,
    showUtils: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
\`\`\`tsx
// Example of configuring analytics in your config file
// config/analytics.ts
export const analytics = {
  googleAnalyticsId: 'G-CUSTOM123456',
  hjid: 123456,
  hjsv: 6,
  umamiWebsiteId: 'custom-website-id',
  umamiInstance: 'https://custom-analytics.yourdomain.com/script.js',
};
\`\`\`
        `,
      },
    },
  },
};

// Add a story showing integration with Next.js
export const NextJsIntegration: Story = {
  args: {
    disableInDevelopment: true,
    showUtils: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Integration with Next.js App Router

\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@/components/Analytics';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### Using the Utility Functions

\`\`\`tsx
import { AnalyticsUtils } from '@/components/Analytics';

// Check if analytics should be enabled
const analyticsEnabled = AnalyticsUtils.shouldEnableAnalytics();

// Get active providers
const activeProviders = AnalyticsUtils.getActiveProviders();
\`\`\`
        `,
      },
    },
  },
};
