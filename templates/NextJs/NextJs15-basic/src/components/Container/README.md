# Container Component

A flexible container component that provides a centered, max-width wrapper with responsive padding options.

## Features

- Centered content with configurable maximum width
- Responsive padding options
- Customizable via Tailwind classes
- Seamless integration with other components
- Built with class-variance-authority for variant management
- Uses tailwind-merge for class name handling

## Props

| Prop      | Type                           | Default    | Description                             |
| --------- | ------------------------------ | ---------- | --------------------------------------- |
| children  | ReactNode                      | (Required) | Content to be rendered inside container |
| className | string                         | ''         | Additional CSS classes                  |
| padding   | 'none' \| 'sm' \| 'md' \| 'lg' | 'md'       | Controls horizontal padding             |
| width     | 'normal' \| 'narrow' \| 'full' | 'normal'   | Controls maximum width                  |

## Usage Examples

### Basic Usage

```tsx
import { Container } from '@components/Container';

function MyPage() {
  return (
    <Container>
      <h1>My Content</h1>
      <p>This content will be centered with a max width and default padding.</p>
    </Container>
  );
}
```

### With Custom Padding

```tsx
import { Container } from '@components/Container';

function MyPage() {
  return (
    <Container padding='lg'>
      <h1>My Content</h1>
      <p>This content will have larger horizontal padding.</p>
    </Container>
  );
}
```

### With Custom Width

```tsx
import { Container } from '@components/Container';

function MyPage() {
  return (
    <Container width='narrow'>
      <h1>My Content</h1>
      <p>This content will have a narrower maximum width.</p>
    </Container>
  );
}
```

### Full Width Container

```tsx
import { Container } from '@components/Container';

function MyPage() {
  return (
    <Container width='full' padding='none'>
      <div className='bg-blue-100 p-8'>
        <h1>Full Width Banner</h1>
        <p>This content will extend the full width of its parent with no padding.</p>
      </div>
    </Container>
  );
}
```

### With Custom Classes

```tsx
import { Container } from '@components/Container';

function MyPage() {
  return (
    <Container className='rounded-lg bg-gray-50 shadow-sm'>
      <h1>My Content</h1>
      <p>This container has a custom background, rounded corners, and a shadow.</p>
    </Container>
  );
}
```

## TODO

- Add support for vertical padding variants
- Consider adding color/background variants
- Add rounded corner variants
- Add support for container queries
- Implement responsive variant options
