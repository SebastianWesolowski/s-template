import { type ReactElement } from 'react';

export interface ISocialMedia {
  icon: {
    normal: ReactElement;
    large: ReactElement;
  };
  name: string;
  url: string;
}
