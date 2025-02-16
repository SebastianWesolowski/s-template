'use client';

import Script from 'next/script';
import config from '@configs';

type GtagEvent = {
  action: string;
  category: string;
  label: string;
  value: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: 'event' | 'config' | 'js',
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: string;
        page_path?: string;
        [key: string]: unknown;
      }
    ) => void;
  }
}

function GAScript(): React.ReactElement {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`}
      />
      <Script strategy='lazyOnload' id='ga-script'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.analytics.googleAnalyticsId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = ({ action, category, label, value }: GtagEvent): void => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export default GAScript;
