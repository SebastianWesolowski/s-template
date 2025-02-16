import config from '@configs';

import GoogleAnalytics from './components/GoogleAnalytics';
import HotJar from './components/HotJar';
import Umami from './components/Umami';

const isProduction = process.env.NODE_ENV === 'production';

export function Analytics(): React.ReactElement | null {
  if (!isProduction) {
    return null;
  }

  return (
    <>
      {config.analytics.googleAnalyticsId && <GoogleAnalytics />}
      {config.analytics.hjid && <HotJar />}
      {config.analytics.umamiWebsiteId && <Umami />}
    </>
  );
}
