import { BasicLayout, Seo } from '@components';
import React from 'react';

export default function Web() {
  return (
    <BasicLayout>
      <Seo />
      <main>
        <section className='dark:bg-gray-900 light:bg-white '>
          <h2>NEXT_PUBLIC_NODE_ENV</h2>
          <p>{process.env.NEXT_PUBLIC_NODE_ENV}</p>
          <p>Hello World</p>
        </section>
      </main>
    </BasicLayout>
  );
}
