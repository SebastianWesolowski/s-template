// src/_components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Przycisk',
    variant: 'default',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destrukcyjny',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Obramowanie',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Drugorzędny',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Mały',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Duży',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🔔',
    'aria-label': 'Ikona',
  },
};
