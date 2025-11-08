import type { Meta, StoryObj } from '@storybook/react';
import { AppProvider } from './AppProvider';

const meta: Meta<typeof AppProvider> = {
  title: 'Components/AppProvider',
  component: AppProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AppProvider>;

export const Default: Story = {
  args: {
    children: <div className='rounded-lg bg-white p-4 dark:bg-gray-800'>Example Content</div>,
  },
};

export const WithThemedContent: Story = {
  args: {
    children: (
      <div className='space-y-4 p-4'>
        <div className='rounded-lg bg-white p-4 dark:bg-gray-800'>Light/Dark Theme Demo</div>
        <p className='text-gray-900 dark:text-gray-100'>This text adapts to theme</p>
      </div>
    ),
  },
};
