import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

// Export meta separately
export default meta;
type Story = StoryObj<typeof Container>;

const stories = {
  Default: {
    args: {
      children: <div className='bg-blue-100 p-4 text-center'>Default container content</div>,
    },
  },

  WithCustomClassName: {
    args: {
      children: <div className='bg-blue-100 p-4 text-center'>Container with custom background</div>,
      className: 'bg-gray-50 border border-gray-200 rounded-lg',
    },
  },

  WithNoPadding: {
    args: {
      children: <div className='bg-blue-100 p-4 text-center'>Container with no padding</div>,
      padding: 'none',
    },
  },

  WithSmallPadding: {
    args: {
      children: <div className='bg-blue-100 p-4 text-center'>Container with small padding</div>,
      padding: 'sm',
    },
  },

  WithLargePadding: {
    args: {
      children: <div className='bg-blue-100 p-4 text-center'>Container with large padding</div>,
      padding: 'lg',
    },
  },

  NarrowWidth: {
    args: {
      children: <div className='bg-blue-100 p-4 text-center'>Narrow container</div>,
      width: 'narrow',
    },
  },

  FullWidth: {
    args: {
      children: <div className='bg-blue-100 p-4 text-center'>Full width container</div>,
      width: 'full',
    },
  },

  WithLongContent: {
    args: {
      children: (
        <div className='bg-blue-100 p-4'>
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} className='mb-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit eget nisl commodo ultrices.
              Praesent euismod euismod nisi, eget ultricies urna rutrum eget. Donec vulputate justo vitae magna rhoncus,
              eget auctor quam tincidunt.
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
export const WithNoPadding = stories.WithNoPadding;
export const WithSmallPadding = stories.WithSmallPadding;
export const WithLargePadding = stories.WithLargePadding;
export const NarrowWidth = stories.NarrowWidth;
export const FullWidth = stories.FullWidth;
export const WithLongContent = stories.WithLongContent;
