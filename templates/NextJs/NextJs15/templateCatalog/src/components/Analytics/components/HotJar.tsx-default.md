'use client';

import Script from 'next/script';
import config from '@configs';

const { hjsv, hjid } = config.analytics;

const HOTJAR_SCRIPT = `
  (function (h, o, t, j, a, r) {
            h.hj =
              h.hj ||
              function () {
                // eslint-disable-next-line prefer-rest-params
                (h.hj.q = h.hj.q || []).push(arguments);
              };
            h._hjSettings = {hjid:${hjid},hjsv:${hjsv}};
            a = o.getElementsByTagName("head")[0];
            r = o.createElement("script");
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
          })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
`;

function HotJar(): React.ReactElement {
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
