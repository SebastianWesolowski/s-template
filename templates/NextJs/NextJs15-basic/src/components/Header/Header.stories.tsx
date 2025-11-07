import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Navigation/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

// Export meta separately
export default meta;
type Story = StoryObj<typeof Header>;

const stories = {
  Default: {
    args: {},
  },

  WithCustomClassName: {
    args: {
      className: 'bg-slate-100',
    },
  },

  WithStickyVariant: {
    args: {
      sticky: true,
      shadow: true,
    },
  },

  FilledVariant: {
    args: {
      variant: 'filled',
    },
  },

  TransparentVariant: {
    args: {
      variant: 'transparent',
    },
  },

  WithCustomMenuItems: {
    args: {},
  },

  WithChildren: {
    args: {
      children: (
        <li className='ml-6 hidden md:block'>
          <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800'>New</span>
        </li>
      ),
    },
  },
} satisfies { [key: string]: Story };

// Export stories individually
export const Default = stories.Default;
export const WithCustomClassName = stories.WithCustomClassName;
export const WithStickyVariant = stories.WithStickyVariant;
export const FilledVariant = stories.FilledVariant;
export const TransparentVariant = stories.TransparentVariant;
export const WithCustomMenuItems = stories.WithCustomMenuItems;
export const WithChildren = stories.WithChildren;
