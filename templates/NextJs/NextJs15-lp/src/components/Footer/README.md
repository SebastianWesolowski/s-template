# Footer Component

A flexible footer component that provides a consistent footer section for all pages with customizable content, spacing, and alignment.

## Features

- Customizable styling through variants
- Social media links (GitHub by default)
- Copyright notice with current year
- Responsive design
- Support for additional content through children
- Built with class-variance-authority for variant management
- Uses tailwind-merge for class name handling

## Props

| Prop      | Type                                | Default   | Description                            |
| --------- | ----------------------------------- | --------- | -------------------------------------- |
| children  | ReactNode                           | undefined | Additional content to render in footer |
| className | string                              | ''        | Additional CSS classes                 |
| align     | 'center' \| 'left' \| 'right'       | 'center'  | Footer content alignment               |
| spacing   | 'normal' \| 'compact' \| 'spacious' | 'normal'  | Controls vertical padding              |

## Usage Examples

### Basic Usage

```tsx
import { Footer } from '@components/Footer';

function Example() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{/* Main content */}</main>
      <Footer />
    </div>
  );
}
```

### With Custom Alignment

```tsx
import { Footer } from '@components/Footer';

function Example() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{/* Main content */}</main>
      <Footer align='left' />
    </div>
  );
}
```

### With Custom Spacing

```tsx
import { Footer } from '@components/Footer';

function Example() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{/* Main content */}</main>
      <Footer spacing='compact' />
    </div>
  );
}
```

### With Additional Content

```tsx
import { Footer } from '@components/Footer';

function Example() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{/* Main content */}</main>
      <Footer>
        <div className='mt-6 w-full text-center sm:mt-0 sm:text-left'>
          <p className='text-sm text-slate-600'>
            This website uses cookies to ensure you get the best experience.{' '}
            <a href='#' className='text-blue-500 hover:underline'>
              Learn more
            </a>
          </p>
        </div>
      </Footer>
    </div>
  );
}
```

### With Additional Social Links

```tsx
import { Footer } from '@components/Footer';

function Example() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{/* Main content */}</main>
      <Footer>
        <div className='mt-6 flex justify-center space-x-4 sm:mt-0'>
          <a href='https://twitter.com/example' className='group'>
            <span className='sr-only'>Twitter</span>
            <svg aria-hidden='true' className='h-6 w-6 fill-slate-500 group-hover:fill-slate-700' viewBox='0 0 24 24'>
              <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
            </svg>
          </a>
          <a href='https://linkedin.com/in/example' className='group'>
            <span className='sr-only'>LinkedIn</span>
            <svg aria-hidden='true' className='h-6 w-6 fill-slate-500 group-hover:fill-slate-700' viewBox='0 0 24 24'>
              <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
            </svg>
          </a>
        </div>
      </Footer>
    </div>
  );
}
```

### With Custom Class Name

```tsx
import { Footer } from '@components/Footer';

function Example() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>{/* Main content */}</main>
      <Footer className='bg-slate-100' />
    </div>
  );
}
```

## Accessibility

- The footer includes proper semantic HTML with the `<footer>` element
- Social links include screen reader text for accessibility
- ARIA attributes are used where appropriate
- Color contrast meets WCAG standards

## TODO

- Add theme color variants
- Add more built-in social media icon options
- Create a newsletter subscription variant
- Add multi-column layout options
- Implement internationalization support for the copyright text
- Add animation options
