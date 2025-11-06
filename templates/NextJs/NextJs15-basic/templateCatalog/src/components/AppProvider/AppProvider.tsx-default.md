import { ThemeProvider } from 'next-themes';
import { type FC, type JSX, type PropsWithChildren } from 'react';

// import { AppContextProvider } from "@context/AppContextProvider"; // TODO SC-125

export const AppProvider: FC<PropsWithChildren<object>> = ({ children }): JSX.Element => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
    {/* <AppContextProvider>{children}</AppContextProvider> // TODO SC-125 */}
    {children}
  </ThemeProvider>
);
