# Enhanced React Component Template Guide

## 1. Component Structure

Create the following files in a standardized way:

```
[ComponentName]/
├── [ComponentName].tsx            # Main component file
├── [ComponentName].stories.tsx    # Storybook stories
├── [ComponentName].test.tsx       # Unit tests
├── README.md                      # Documentation
├── index.ts                       # Export file
├── hooks/                         # (Optional) Component-specific hooks
│   └── use[ComponentName].ts      # Custom hook for complex logic
├── utils/                         # (Optional) Component-specific utilities
│   └── [componentName]Utils.ts    # Utility functions
└── components/                    # (Optional) For complex components with subcomponents
    └── [SubComponentName].tsx     # Subcomponent implementation
```

## 2. Component Implementation ([ComponentName].tsx)

```tsx
import { type FC, type ReactNode, forwardRef } from 'react';
import { cn } from '@utils';  // Utility for class name merging

// Use a prefix for component-specific constants
const COMPONENT_BASE_CLASS = 'base-component';

export interface [ComponentName]Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered inside the component
   */
  children?: ReactNode;

  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;

  /**
   * Whether the component is disabled
   */
  disabled?: boolean;

  /**
   * The component's variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * The component's size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  // Add other props with JSDoc comments
}

/**
 * [ComponentName] - Brief description of the component's purpose
 *
 * @example
 * <[ComponentName] variant="primary" size="md">
 *   Content
 * </[ComponentName]>
 */
export const [ComponentName] = forwardRef<HTMLDivElement, [ComponentName]Props>(({
  children,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  ...restProps
}, ref): ReactNode => {
  // Separate business logic from presentation
  const handleSomething = () => {
    // Component logic here
  };

  // Conditional class assignments using variants
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-800',
    tertiary: 'bg-transparent border border-gray-300',
  };

  const sizeClasses = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  return (
    <div
      ref={ref}
      className={cn(
        COMPONENT_BASE_CLASS,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-disabled={disabled || undefined}
      {...restProps}
    >
      {children}
    </div>
  );
});

// Always set display name for better debugging
[ComponentName].displayName = '[ComponentName]';
```

## 3. Storybook Stories ([ComponentName].stories.tsx)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { [ComponentName] } from './[ComponentName]';

const meta: Meta<typeof [ComponentName]> = {
  title: 'UI/[ComponentName]',
  component: [ComponentName],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...', // Link to Figma design if available
    },
    a11y: {
      config: {
        rules: [
          {
            // Specific accessibility rules if needed
          }
        ]
      }
    }
  },
  argTypes: {
    // Define argTypes for Storybook controls
    className: { control: 'text', description: 'Additional CSS classes' },
    disabled: { control: 'boolean', description: 'Disables the component' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    },
    onClick: { action: 'clicked' },
  },
}

// Export meta separately
export default meta;
type Story = StoryObj<typeof [ComponentName]>;

// Create a Template for reuse
const Template: Story = {
  render: (args) => <[ComponentName] {...args} />,
};

const stories = {
  Default: {
    ...Template,
    args: {
      children: 'Default content',
      variant: 'primary',
      size: 'md',
    },
  },

  Secondary: {
    ...Template,
    args: {
      children: 'Secondary variant',
      variant: 'secondary',
    },
  },

  Small: {
    ...Template,
    args: {
      children: 'Small size',
      size: 'sm',
    },
  },

  Large: {
    ...Template,
    args: {
      children: 'Large size',
      size: 'lg',
    },
  },

  WithCustomClassName: {
    ...Template,
    args: {
      children: 'Customized component',
      className: 'bg-primary-50 p-4 rounded-md',
    },
  },

  Disabled: {
    ...Template,
    args: {
      children: 'Disabled component',
      disabled: true,
    },
  },

  // Story with decorators for context providers if needed
  WithContext: {
    ...Template,
    args: {
      children: 'With context',
    },
    decorators: [
      (Story) => (
        <SomeContextProvider>
          <Story />
        </SomeContextProvider>
      ),
    ],
  },
} satisfies { [key: string]: Story };

// Export stories individually
export const Default = stories.Default;
export const Secondary = stories.Secondary;
export const Small = stories.Small;
export const Large = stories.Large;
export const WithCustomClassName = stories.WithCustomClassName;
export const Disabled = stories.Disabled;
export const WithContext = stories.WithContext;
```

## 4. Unit Tests ([ComponentName].test.tsx)

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { maybeSnapshot } from '@utils';
import { [ComponentName] } from './[ComponentName]';

describe('[ComponentName]', () => {
  const renderComponent = (props = {}) => {
    return render(
      <[ComponentName] {...props}>Test Content</[ComponentName]>
    );
  };

  it('renders correctly with default props', () => {
    const { container } = renderComponent();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    maybeSnapshot(container);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = renderComponent({ className: customClass });

    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain(customClass);
    maybeSnapshot(container);
  });

  it('handles disabled state correctly', () => {
    const { container } = renderComponent({ disabled: true });

    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain('opacity-50');
    expect(element.className).toContain('cursor-not-allowed');
    expect(element.getAttribute('aria-disabled')).toBe('true');
    maybeSnapshot(container);
  });

  it('applies the correct variant classes', () => {
    const { container: primaryContainer } = renderComponent({ variant: 'primary' });
    const { container: secondaryContainer } = renderComponent({ variant: 'secondary' });

    const primaryElement = primaryContainer.firstChild as HTMLElement;
    const secondaryElement = secondaryContainer.firstChild as HTMLElement;

    expect(primaryElement.className).toContain('bg-blue-500');
    expect(secondaryElement.className).toContain('bg-gray-200');
  });

  it('applies the correct size classes', () => {
    const { container: smallContainer } = renderComponent({ size: 'sm' });
    const { container: largeContainer } = renderComponent({ size: 'lg' });

    const smallElement = smallContainer.firstChild as HTMLElement;
    const largeElement = largeContainer.firstChild as HTMLElement;

    expect(smallElement.className).toContain('text-sm');
    expect(largeElement.className).toContain('text-lg');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(
      <[ComponentName] ref={ref}>Test Content</[ComponentName]>
    );
    expect(ref).toHaveBeenCalled();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(
      <[ComponentName] onClick={handleClick}>Clickable</[ComponentName]>
    );

    await userEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click events when disabled', async () => {
    const handleClick = jest.fn();
    render(
      <[ComponentName] onClick={handleClick} disabled>Disabled</[ComponentName]>
    );

    await userEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('passes accessibility tests', async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Add more tests for component-specific functionality
});
```

## 5. Documentation (README.md)

````markdown
# [ComponentName]

Brief description of the component's purpose and functionality.

![Component Preview](./preview.png)

## Features

- ✅ Feature 1
- ✅ Feature 2
- ✅ Fully accessible
- ✅ Responsive design
- ✅ Customizable via props
- ✅ Multiple size and style variants

## Installation

```tsx
import { [ComponentName] } from '@components/[ComponentName]';
```
````

## Usage

### Basic Usage

```tsx
<[ComponentName]>
  Content goes here
</[ComponentName]>
```

### With Variants

```tsx
<[ComponentName] variant="primary">
  Primary variant
</[ComponentName]>

<[ComponentName] variant="secondary">
  Secondary variant
</[ComponentName]>

<[ComponentName] variant="tertiary">
  Tertiary variant
</[ComponentName]>
```

### Different Sizes

```tsx
<[ComponentName] size="sm">
  Small component
</[ComponentName]>

<[ComponentName] size="md">
  Medium component (default)
</[ComponentName]>

<[ComponentName] size="lg">
  Large component
</[ComponentName]>
```

### With Custom Styling

```tsx
<[ComponentName] className="bg-primary-50 p-4 rounded-md">
  Custom styled content
</[ComponentName]>
```

### Disabled State

```tsx
<[ComponentName] disabled>
  Disabled content
</[ComponentName]>
```

### With Event Handler

```tsx
<[ComponentName] onClick={() => console.log('Clicked!')}>
  Click me
</[ComponentName]>
```

## API Reference

| Prop      | Type                                   | Default   | Description                                 |
| --------- | -------------------------------------- | --------- | ------------------------------------------- |
| children  | ReactNode                              | -         | Content to be rendered within the component |
| className | string                                 | ''        | Additional CSS classes                      |
| disabled  | boolean                                | false     | Whether the component is disabled           |
| variant   | 'primary' \| 'secondary' \| 'tertiary' | 'primary' | Visual style variant                        |
| size      | 'sm' \| 'md' \| 'lg'                   | 'md'      | Size of the component                       |
| ...props  | HTMLAttributes\<HTMLDivElement\>       | -         | All standard HTML div attributes            |

## Accessibility

- Keyboard navigation support (Tab, Enter, Space)
- Screen reader friendly with appropriate ARIA attributes
- ARIA attributes for interactive elements
- Focus management
- Meets WCAG 2.1 AA standards

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 compatibility: ⚠️ Requires additional polyfills

## Best Practices

- Prefer composition with this component over custom implementations
- Use consistent variants across the application
- Always provide accessible labels for interactive versions

## Known Issues

- None

## TODOs

- [ ] Add animation variants
- [ ] Implement RTL support
- [ ] Add comprehensive keyboard navigation

````

## 6. Export File (index.ts)

```ts
// Export main component
export * from './[ComponentName]';

// Export any hooks
export * from './hooks/use[ComponentName]';

// Export any types needed by consumers
export type { [ComponentName]Props } from './[ComponentName]';

// Export subcomponents if applicable
// export * from './components/[SubComponentName]';
````

## 7. Hooks (Recommended for Complex Components)

```tsx
// hooks/use[ComponentName].ts

import { useState, useEffect, useCallback } from 'react';

export interface Use[ComponentName]Props {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export interface Use[ComponentName]Return {
  value: string;
  setValue: (newValue: string) => void;
  reset: () => void;
  isChanged: boolean;
}

/**
 * Custom hook to manage [ComponentName] state and logic
 */
export const use[ComponentName] = ({
  initialValue = '',
  onChange,
}: Use[ComponentName]Props = {}): Use[ComponentName]Return => {
  const [value, setValueInternal] = useState(initialValue);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setValueInternal(initialValue);
    setIsChanged(false);
  }, [initialValue]);

  const setValue = useCallback((newValue: string) => {
    setValueInternal(newValue);
    setIsChanged(newValue !== initialValue);
    onChange?.(newValue);
  }, [initialValue, onChange]);

  const reset = useCallback(() => {
    setValueInternal(initialValue);
    setIsChanged(false);
  }, [initialValue]);

  return {
    value,
    setValue,
    reset,
    isChanged,
  };
};
```

## 8. Additional Best Practices

### Component Design Principles

- **Single Responsibility**: Each component should do one thing well
- **Encapsulation**: Hide implementation details, expose clean API
- **Composability**: Design components that work well together
- **Reusability**: Create generalized components that can be used in many contexts
- **Consistency**: Follow established patterns across the component library

### Responsive Design

- Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
- Test on multiple viewport sizes (320px, 768px, 1024px, 1440px)
- Consider mobile-first approach for all components
- Use container queries where appropriate for container-relative styling
- Test with different zoom levels and font sizes

### Performance Optimization

- Use React.memo for expensive renders
- Implement useMemo and useCallback for optimized dependencies
- Keep component rendering efficient with proper dependency arrays
- Avoid unnecessary re-renders by optimizing state structure
- Use virtualization for long lists (react-window or react-virtualized)
- Consider code-splitting for larger components with React.lazy

### Accessibility

- Include proper ARIA attributes (aria-label, aria-expanded, etc.)
- Ensure keyboard navigation follows logical tab order
- Provide sufficient color contrast (minimum 4.5:1 for small text)
- Support screen readers with descriptive text
- Implement focus management for modal components
- Test with real screen readers (VoiceOver, NVDA)
- Include skip links for navigation components
- Support reduced motion preferences with prefers-reduced-motion

### State Management

- Use useState for local state
- Consider useReducer for complex state
- Implement controlled components where appropriate
- Use context API for state that needs to be accessed by many components
- Keep state as close as possible to where it's needed
- Avoid prop drilling with composition patterns

### Error Handling

- Implement error boundaries around components
- Add proper validation for props
- Provide meaningful error messages
- Gracefully handle loading, error, and empty states
- Include fallback UI for error cases
- Log errors to monitoring systems

### Composition Patterns

- Prefer composition over inheritance
- Use the compound component pattern for complex components
- Implement the render props pattern where appropriate
- Consider using higher-order components for cross-cutting concerns
- Use slot patterns for flexible layouts

### Styling

- Use class-variance-authority (cva) for variant management
- Implement consistent spacing using Tailwind's spacing scale
- Follow the existing color scheme in tailwind.config.ts
- Support dark/light mode with dark: variants
- Use relative units (rem, em) instead of pixels
- Implement design tokens for consistency
- Create responsive styles with mobile-first approach
- Consider component-specific themes
- Use CSS variables for dynamic theming

### Testing Strategy

- Test all possible states and variants
- Include interaction tests with userEvent
- Test accessibility with jest-axe
- Test for proper responsive behavior
- Write integration tests for complex components
- Test edge cases (empty content, long content, etc.)
- Include visual regression tests
- Mock context providers for component testing
- Test keyboard navigation

### Documentation Best Practices

- Document all props with JSDoc comments
- Include usage examples for all variants
- Document any potential side effects
- Add clear component descriptions
- Include accessibility considerations
- Provide real-world examples
- Document keyboard shortcuts if applicable
- Include performance considerations
- Link to related components
- Use TypeScript for self-documenting code

### Component API Design

- Keep props minimal but sufficient
- Use sensible defaults
- Design with composition in mind
- Follow established patterns from existing components
- Use consistent naming conventions
- Accept standard HTML attributes
- Provide event handlers with standardized signatures
- Consider backward compatibility for updates
- Use TypeScript for prop type checking and autocompletion
- Support spreading of HTML attributes

### Interactivity

- Handle focus states properly
- Implement hover and active states
- Support keyboard interactions
- Provide appropriate feedback for user actions
- Consider animations and transitions
- Handle touch interactions properly
- Implement appropriate loading states

### Internationalization

- Support right-to-left languages
- Make text content translatable
- Consider variable text length in designs
- Support formatting of dates, numbers, and currencies
- Use Unicode characters properly
- Test with various languages

### SEO Considerations

- Use semantic HTML elements
- Provide appropriate heading structure
- Include proper image alt text
- Consider page title and meta description integration
- Support schema.org markup where appropriate
