import { Button as ShadcnButton } from '@/_components/ui/button';
import { BasicLayout, Button, ButtonLink, Seo } from '@components';
import React from 'react';

export default function Web(): React.ReactElement {
  return (
    <BasicLayout>
      <Seo />
      <main>
        <section className='light:bg-white dark:bg-gray-900'>
          <p>Hello World</p>
        </section>
        <div className='flex flex-col gap-4'>
          <button>button</button>
          <Button href='/' intent='primary' size='lg'>
            Przycisk Button
          </Button>
          <ButtonLink href='/' intent='secondary' size='sm' underline>
            Przycisk ButtonLink
          </ButtonLink>
          <ShadcnButton>Przycisk ShadcnButton</ShadcnButton>
        </div>
      </main>
    </BasicLayout>
  );
}
