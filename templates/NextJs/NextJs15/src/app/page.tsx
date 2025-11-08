import { Button as ShadcnButton } from '@/ui/button';
import { BasicLayout } from '@components';
import React from 'react';

export default function Web(): React.ReactElement {
  return (
    <BasicLayout>
      <ShadcnButton>Przycisk ShadcnButton</ShadcnButton>
    </BasicLayout>
  );
}
