import config from '@configs';
import { type ReactElement } from 'react';

import GoogleAnalytics from './components/GoogleAnalytics';
import HotJar from './components/HotJar';
import Umami from './components/Umami';

/**
 * Constants for the Analytics component
 */
const ANALYTICS_ENV = {
  PRODUCTION: process.env.NODE_ENV === 'production',
};

/**
 * Analytics component props
 * @typedef {Object} AnalyticsProps
 * @property {boolean} disableInDevelopment - Whether to disable analytics in development environment
 */
export interface AnalyticsProps {
  /**
   * Whether to disable analytics in development environment
   * @default true
   */
  disableInDevelopment?: boolean;
}

/**
 * Next.js utility component for managing analytics services
 *
 * This is not a visual component but a utility that loads and initializes
 * various analytics providers for Next.js applications.
 *
 * @example
 * // In your Next.js layout.tsx or app.tsx
 * import { Analytics } from '@/components/Analytics';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <Analytics />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 */
export function Analytics({ disableInDevelopment = true }: AnalyticsProps = {}): ReactElement | null {
  // Don't render analytics in development mode if disabled
  if (disableInDevelopment && !ANALYTICS_ENV.PRODUCTION) {
    return null;
  }

  return (
    <>
      {config.analytics.googleAnalyticsId && <GoogleAnalytics key='ga' />}
      {config.analytics.hjid && config.analytics.hjsv && <HotJar key='hotjar' />}
      {config.analytics.umamiWebsiteId && config.analytics.umamiInstance && <Umami key='umami' />}
    </>
  );
}

/**
 * UTILS - Analytics-related utility functions
 */
export const AnalyticsUtils = {
  /**
   * Check if analytics should be enabled based on environment and configuration
   *
   * @param {boolean} disableInDevelopment - Whether to disable in development
   * @returns {boolean} Whether analytics should be enabled
   */
  shouldEnableAnalytics(disableInDevelopment = true): boolean {
    return !disableInDevelopment || ANALYTICS_ENV.PRODUCTION;
  },

  /**
   * Get active analytics providers based on configuration
   *
   * @returns {string[]} List of active analytics providers
   */
  getActiveProviders(): string[] {
    const providers: string[] = [];

    if (config.analytics.googleAnalyticsId) {
      providers.push('googleAnalytics');
    }

    if (config.analytics.hjid && config.analytics.hjsv) {
      providers.push('hotjar');
    }

    if (config.analytics.umamiWebsiteId && config.analytics.umamiInstance) {
      providers.push('umami');
    }

    return providers;
  },
};

// Set display name for better debugging
Analytics.displayName = 'Analytics';
