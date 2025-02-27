import { BasicLayout, Seo } from '@components';
import React from 'react';

export default function Web(): React.ReactElement {
  return (
    <BasicLayout>
      <Seo />
      <main>
        <section className='light:bg-white dark:bg-gray-900'>
          <p>Hello World</p>
        </section>
      </main>
    </BasicLayout>
  );
}
