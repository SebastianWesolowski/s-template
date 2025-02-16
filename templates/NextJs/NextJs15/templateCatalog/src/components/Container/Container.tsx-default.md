import { type PropsWithChildren } from 'react';

export interface IContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ className = '', children }: IContainerProps): React.ReactElement {
  return <div className={`mx-auto max-w-7xl ${className}`}>{children}</div>;
}
