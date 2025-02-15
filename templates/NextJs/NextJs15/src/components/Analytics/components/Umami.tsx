import Script from 'next/script';
import config from '@configs';

function UmamiScript() {
  if (!config.analytics.umamiWebsiteId) {
    console.warn('[Umami] Missing website ID configuration');
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
      onError={(e) => {
        console.error('[Umami] Failed to load:', e);
      }}
    />
  );
}

export default UmamiScript;
