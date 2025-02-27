'use client';

import Script from 'next/script';
import config from '@configs';
import { type ReactElement } from 'react';

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function logUmamiEvent(eventName: string, data?: Record<string, unknown>): void {
  try {
    window.umami?.track(eventName, data);
  } catch (error) {
    console.error('[Umami] Failed to log event:', error);
  }
}

export function UmamiScript(): ReactElement | null {
  if (!config.analytics.umamiWebsiteId || !config.analytics.umamiInstance) {
    console.warn('[Umami] Missing required configuration');
    return null;
  }

  return (
    <Script
      strategy='lazyOnload'
      async
      defer
      data-website-id={config.analytics.umamiWebsiteId}
      src={config.analytics.umamiInstance}
      data-domains={config.url.production}
      data-cache='true'
      data-auto-track='true'
      onError={(e) => {
        console.error('[Umami] Failed to load:', e);
      }}
    />
  );
}

export default UmamiScript;
