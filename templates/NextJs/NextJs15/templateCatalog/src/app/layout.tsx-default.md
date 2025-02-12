import '@/styles/tailwind.scss';
import '@/styles/global.scss';

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css"; // Client-side cache, shared for the whole session of the user in the browser.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
