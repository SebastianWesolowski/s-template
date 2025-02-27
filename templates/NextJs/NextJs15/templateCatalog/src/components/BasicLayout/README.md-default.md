# BasicLayout Component

A foundational layout component that provides a basic structure for pages with a consistent header and footer.

## Features

- Built-in Header and Footer components
- Flexible main content area
- Responsive design
- Customizable through className prop
- TypeScript support
- Tailwind CSS styling

## Usage

```tsx
import { BasicLayout } from './components/BasicLayout';

function Example() {
  return (
    <BasicLayout>
      <main className='flex-1 p-4'>
        <h1>Page Title</h1>
        <p>Your page content goes here.</p>
      </main>
    </BasicLayout>
  );
}
```

## Props

| Prop      | Type      | Required | Default | Description                                   |
| --------- | --------- | -------- | ------- | --------------------------------------------- |
| children  | ReactNode | Yes      | -       | The content to be rendered in the main area   |
| className | string    | No       | ''      | Additional CSS classes to apply to the layout |

## Layout Structure

The BasicLayout component automatically includes Header and Footer components and expects your content to be placed in the main area:

```tsx
<BasicLayout>
  {/* Header is automatically included */}
  <main>Your content here</main>
  {/* Footer is automatically included */}
</BasicLayout>
```

## Best Practices

1. Always wrap your main content in a `<main>` tag
2. Use the `flex-1` class on your main content to ensure proper spacing
3. Add padding to your content as needed (e.g., `p-4`)
4. Use semantic HTML elements within the main content area
5. Consider accessibility when structuring content

## Component Dependencies

- `@components/Header` - Provides the top navigation and branding
- `@components/Footer` - Provides the footer content

## TODO

- [ ] Add layout configuration options
- [ ] Add header/footer visibility toggles
- [ ] Add layout transitions
- [ ] Add more layout variants
- [ ] Add theme-aware styling options
- [ ] Add sticky header option
- [ ] Add responsive navigation menu
