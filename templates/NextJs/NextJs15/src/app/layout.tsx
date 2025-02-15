// Client-side cache, shared for the whole session of the user in the browser.
import { Analytics, AppProvider } from '@components';
import config from '@configs';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@styles/global.scss';
import '@styles/tailwind.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={config.SEO.locale}
      suppressHydrationWarning
      className="h-full scroll-smooth antialiased [font-feature-settings:'ss01']"
    >
      <body className='flex h-full flex-col'>
        <AppProvider>
          <Analytics />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
