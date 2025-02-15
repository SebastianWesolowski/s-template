import { Footer, Header } from '@components';
import { type PropsWithChildren } from 'react';

export function BasicLayout({ children }: PropsWithChildren<object>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
