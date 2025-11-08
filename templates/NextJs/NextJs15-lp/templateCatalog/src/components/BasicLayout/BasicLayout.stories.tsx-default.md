import type { Meta, StoryObj } from '@storybook/react';
import { BasicLayout } from './BasicLayout';

const meta: Meta<typeof BasicLayout> = {
  title: 'Layout/BasicLayout',
  component: BasicLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

// Export meta separately
export default meta;
type Story = StoryObj<typeof BasicLayout>;

const stories = {
  Default: {
    args: {
      children: <div className='flex-1 p-4'>Main content goes here</div>,
    },
  },

  WithCustomClassName: {
    args: {
      children: <div className='flex-1 p-4'>Main content with custom background</div>,
      className: 'bg-gray-100',
    },
  },
  WithLongContent: {
    args: {
      children: (
        <div className='flex-1 p-4'>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className='mb-4'>
              Long content paragraph {i + 1}
            </p>
          ))}
        </div>
      ),
    },
  },
} satisfies { [key: string]: Story };

// Export stories individually
export const Default = stories.Default;
export const WithCustomClassName = stories.WithCustomClassName;
export const WithLongContent = stories.WithLongContent;
