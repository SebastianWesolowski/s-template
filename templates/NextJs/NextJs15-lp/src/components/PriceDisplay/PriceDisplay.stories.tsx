import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Display/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

// Export meta separately
export default meta;
type Story = StoryObj<typeof PriceDisplay>;

const stories = {
  Default: {
    args: {
      price: 199.99,
    },
  },

  WithCustomClassName: {
    args: {
      price: 199.99,
      className: 'bg-gray-100 p-2 rounded',
    },
  },

  SmallSize: {
    args: {
      price: 49.99,
      size: 'sm',
    },
  },

  LargeSize: {
    args: {
      price: 1299.99,
      size: 'lg',
    },
  },

  ExtraLargeSize: {
    args: {
      price: 9999.99,
      size: 'xl',
    },
  },

  PrimaryIntent: {
    args: {
      price: 199.99,
      intent: 'primary',
    },
  },

  SuccessIntent: {
    args: {
      price: 199.99,
      intent: 'success',
    },
  },

  WarningIntent: {
    args: {
      price: 199.99,
      intent: 'warning',
    },
  },

  DangerIntent: {
    args: {
      price: 199.99,
      intent: 'danger',
    },
  },

  PriceVariations: {
    args: {
      price: 0,
    },
    render: () => (
      <div className='flex flex-col gap-4'>
        <PriceDisplay price={0} />
        <PriceDisplay price={9.99} />
        <PriceDisplay price={199.99} />
        <PriceDisplay price={1299.99} />
        <PriceDisplay price={9999.99} />
      </div>
    ),
  },
} satisfies { [key: string]: Story };

// Export stories individually
export const Default = stories.Default;
export const WithCustomClassName = stories.WithCustomClassName;
export const SmallSize = stories.SmallSize;
export const LargeSize = stories.LargeSize;
export const ExtraLargeSize = stories.ExtraLargeSize;
export const PrimaryIntent = stories.PrimaryIntent;
export const SuccessIntent = stories.SuccessIntent;
export const WarningIntent = stories.WarningIntent;
export const DangerIntent = stories.DangerIntent;
export const PriceVariations = stories.PriceVariations;
