import type { Meta, StoryObj } from '@storybook/react';

import { ButtonLink } from '.';

const meta: Meta<typeof ButtonLink> = {
  title: 'Components/ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    intent: 'primary',
    underline: false,
    children: 'Button Link',
    size: 'lg',
    href: '#',
  },
  argTypes: {
    intent: {
      description: 'Style variant of the button link',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Size of the button link',
      options: ['sm', 'lg'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    underline: {
      description: 'Text underline style',
      control: 'boolean',
    },
    href: {
      description: 'Link destination URL',
      control: 'text',
    },
    children: {
      description: 'Button link content',
      control: 'text',
    },
  },
};

type Story = StoryObj<typeof ButtonLink>;

export const Primary: Story = {
  args: {
    intent: 'primary',
    children: 'Primary Button Link',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    children: 'Secondary Button Link',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button Link',
  },
};

export const WithUnderline: Story = {
  args: {
    underline: true,
    children: 'Underlined Button Link',
  },
};

export default meta;
