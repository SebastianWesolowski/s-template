'use client';

import Script from 'next/script';
import config from '@configs';
import { type ReactElement } from 'react';

const { hjsv, hjid } = config.analytics;

declare global {
  interface Window {
    hj?: (...args: unknown[]) => void;
    _hjSettings?: {
      hjid: number;
      hjsv: number;
    };
  }
}

const HOTJAR_URL = 'https://static.hotjar.com/c/hotjar-';
const HOTJAR_EXTENSION = '.js?sv=';

const HOTJAR_SCRIPT = `
  (function(h,o,t,j,a,r) {
    h.hj = h.hj || function() {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
    h._hjSettings = { hjid: ${hjid}, hjsv: ${hjsv} };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = true;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, '${HOTJAR_URL}', '${HOTJAR_EXTENSION}');
`;

export function logHotjarEvent(eventName: string): void {
  try {
    window.hj?.('event', eventName);
  } catch (error) {
    console.error('[HotJar] Failed to log event:', error);
  }
}

export function HotJar(): ReactElement {
  return (
    <Script
      id='hotjar-script'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{ __html: HOTJAR_SCRIPT }}
      onError={(e) => {
        console.error('[HotJar] Failed to load:', e);
      }}
    />
  );
}

export default HotJar;
