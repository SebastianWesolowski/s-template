'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import config from '@configs';
import { useEffect } from 'react';

export interface GtagEvent {
  action: string;
  category: string;
  label: string;
  value?: number | string;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number | string;
        page_path?: string;
        send_page_view?: boolean;
        [key: string]: unknown;
      }
    ) => void;
  }
}

export function logEvent({ action, category, label, value }: GtagEvent): void {
  try {
    const params: Record<string, unknown> = {
      event_category: category,
      event_label: label,
    };

    if (value !== undefined) {
      params['value'] = value;
    }

    window.gtag?.('event', action, params);
  } catch (error) {
    console.error('[GA] Failed to log event:', error);
  }
}

export function GAScript(): React.ReactElement {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      logEvent({
        action: 'page_view',
        category: 'navigation',
        label: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`}
        onError={(e) => {
          console.error('[GA] Failed to load script:', e);
        }}
      />
      <Script
        strategy='lazyOnload'
        id='ga-script'
        onError={(e) => {
          console.error('[GA] Failed to initialize:', e);
        }}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.analytics.googleAnalyticsId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

export default GAScript;
