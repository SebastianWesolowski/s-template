# Analytics Utility Component for Next.js

A non-visual, utility-focused analytics integration component that supports multiple analytics providers (Google Analytics 4, HotJar, and Umami) for tracking user behavior and website performance in Next.js applications.

## Features

- ⚙️ Next.js App Router compatibility
- 🧰 Utility functions for analytics management
- 🔍 Google Analytics 4 integration with event tracking
- 🔥 HotJar session recording and heatmaps
- 📊 Umami analytics with custom event support
- 🚫 Disabled in development environment (configurable)
- 🦥 Lazy loading of analytics scripts
- ⚡ Optimized for performance with proper script loading strategies
- 🔒 TypeScript support with strict typing
- 📱 Automatic page view tracking
- 🛠 Error handling and logging

## Installation

1. Configure your analytics providers in the config file:

```typescript
// config/analytics.ts
export const analytics = {
  googleAnalyticsId: 'G-XXXXXXXXXX',
  hjid: 123456,
  hjsv: 6,
  umamiWebsiteId: 'your-website-id',
  umamiInstance: 'https://analytics.yourdomain.com/script.js',
};
```

## Usage

### Basic Setup in Next.js App Router

```typescript
// app/layout.tsx
import { Analytics } from '@/components/Analytics';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Using the Utility Functions

```typescript
import { AnalyticsUtils } from '@/components/Analytics';

// Check if analytics should be enabled
const analyticsEnabled = AnalyticsUtils.shouldEnableAnalytics();
console.log('Analytics enabled:', analyticsEnabled);

// Get active providers
const activeProviders = AnalyticsUtils.getActiveProviders();
console.log('Active providers:', activeProviders);
```

### Event Tracking

```typescript
import { logEvent } from '@/components/Analytics/components/GoogleAnalytics';
import { logHotjarEvent } from '@/components/Analytics/components/HotJar';
import { logUmamiEvent } from '@/components/Analytics/components/Umami';

// Google Analytics event
logEvent({
  action: 'button_click',
  category: 'engagement',
  label: 'signup_button',
  value: 1,
});

// HotJar event
logHotjarEvent('user_signup');

// Umami event
logUmamiEvent('form_submission', {
  form_name: 'contact',
  status: 'success',
});
```

## API Reference

### Analytics Component

| Prop                 | Type    | Default | Description                                             |
| -------------------- | ------- | ------- | ------------------------------------------------------- |
| disableInDevelopment | boolean | true    | Whether to disable analytics in development environment |

### Analytics Utilities

```typescript
// Check if analytics should be enabled
AnalyticsUtils.shouldEnableAnalytics(disableInDevelopment?: boolean): boolean

// Get active analytics providers
AnalyticsUtils.getActiveProviders(): string[]
```

### Google Analytics Events

```typescript
interface GtagEvent {
  action: string; // The action name
  category: string; // Event category
  label: string; // Event label
  value?: number | string; // Optional value
}
```

### HotJar Events

```typescript
function logHotjarEvent(eventName: string): void;
```

### Umami Events

```typescript
function logUmamiEvent(eventName: string, data?: Record<string, unknown>): void;
```

## Configuration

Each analytics provider requires specific configuration in your config file:

- Google Analytics: `googleAnalyticsId`
- HotJar: `hjid` (HotJar ID) and `hjsv` (HotJar Snippet Version)
- Umami: `umamiWebsiteId` and `umamiInstance` (script URL)

## Next.js Integration Details

This component is specifically designed for Next.js with features that leverage Next.js capabilities:

- Uses Next.js `Script` component for optimized script loading
- Implements the App Router's `usePathname` and `useSearchParams` hooks for page tracking
- Properly handles client-side navigation events
- Works in both pages and app directories

## Best Practices

1. Place the Analytics component in your root layout for site-wide tracking
2. Use the utility functions to conditionally enable/disable tracking based on user preferences
3. Always handle errors when tracking events
4. Use meaningful event names and categories
5. Keep sensitive information out of analytics events
6. Test analytics in a staging environment
7. Monitor analytics performance impact

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11 not supported

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Create a pull request

## License

MIT
