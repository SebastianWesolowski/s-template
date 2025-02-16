import { Footer, Header } from '@components';
import { type PropsWithChildren } from 'react';

export function BasicLayout({ children }: PropsWithChildren<object>): React.ReactElement {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
