// Client-side cache, shared for the whole session of the user in the browser.
import { AppProvider } from '@components';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import '@fontsource/lexend/400.css';
import '@fontsource/lexend/500.css';
import '@styles/global.scss';
import '@styles/tailwind.css';

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html suppressHydrationWarning className="h-full scroll-smooth antialiased [font-feature-settings:'ss01']">
      <body className='flex h-full flex-col'>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
