import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    intent: 'primary',
    underline: false,
    children: 'Button',
    size: 'lg',
    href: '#',
  },
  argTypes: {
    intent: {
      description: 'Style wariantu przycisku',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Rozmiar przycisku',
      options: ['sm', 'lg'],
      control: { type: 'radio' },
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    underline: {
      description: 'Podkreślenie tekstu',
      control: 'boolean',
    },
    href: {
      description: 'Link URL',
      control: 'text',
    },
    children: {
      description: 'Zawartość przycisku',
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    intent: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    children: 'Secondary Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const WithUnderline: Story = {
  args: {
    underline: true,
    children: 'Underlined Button',
  },
};

export default meta;
