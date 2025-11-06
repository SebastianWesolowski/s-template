# Header Component

A flexible and responsive header component that provides consistent navigation for your application with customizable menu items, styling variants, and mobile responsiveness.

## Features

- Desktop and mobile navigation support
- Logo and menu items display
- Right-side action buttons (CTAs)
- Customizable styling through variants
- Sticky positioning option
- Shadow effect option
- Responsive design (mobile-first)
- Built with class-variance-authority for variant management
- Uses tailwind-merge for class name handling
- Accessibility compliance

## Props

| Prop             | Type                                   | Default                              | Description                                     |
| ---------------- | -------------------------------------- | ------------------------------------ | ----------------------------------------------- |
| children         | ReactNode                              | undefined                            | Optional content to render within the header    |
| className        | string                                 | ''                                   | Additional CSS classes to apply                 |
| variant          | 'default' \| 'transparent' \| 'filled' | 'default'                            | Visual style variant                            |
| sticky           | boolean                                | false                                | Whether header sticks to the top when scrolling |
| shadow           | boolean                                | false                                | Whether to show a shadow below the header       |
| menuContent      | IMenuItem[]                            | config.content.menu['headerMenu']    | Left side menu items                            |
| menuRightContent | IMenuItem[]                            | config.content.menu['headerCTAMenu'] | Right side menu items (including CTAs)          |

## Usage Examples

### Basic Usage

```tsx
import { Header } from '@components/Header';

function MyPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>{/* Main content */}</main>
    </div>
  );
}
```

### With Custom Menu Items

```tsx
import { Header } from '@components/Header';

function MyPage() {
  const menuItems = [
    { id: '1', title: 'Home', url: '/' },
    { id: '2', title: 'Products', url: '/products' },
    { id: '3', title: 'About', url: '/about' },
  ];

  const rightMenuItems = [
    { id: '4', title: 'Login', url: '/login' },
    { id: '5', title: 'Sign Up', url: '/signup', button: true },
  ];

  return (
    <div className='flex min-h-screen flex-col'>
      <Header menuContent={menuItems} menuRightContent={rightMenuItems} />
      <main className='flex-1'>{/* Main content */}</main>
    </div>
  );
}
```

### With Styling Variants

```tsx
import { Header } from '@components/Header';

function MyPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header variant='filled' sticky shadow className='border-b border-gray-200' />
      <main className='flex-1'>{/* Main content */}</main>
    </div>
  );
}
```

### With Additional Content

```tsx
import { Header } from '@components/Header';

function MyPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header>
        <li className='ml-6 hidden md:block'>
          <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800'>New</span>
        </li>
      </Header>
      <main className='flex-1'>{/* Main content */}</main>
    </div>
  );
}
```

## TODO

- Add support for dropdown/nested menus
- Add animation options for sticky behavior
- Implement color theme variants
- Add context integration for active route highlighting
- Support for breadcrumbs integration
- Add more mobile menu customization options
