import type { ComponentProps } from 'react';

type PropsOf<T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>> = ComponentProps<T>;

type ComponentWithChildren<P = object> = React.FC<P & { children?: React.ReactNode }>;

// Example:
// type ButtonProps = PropsOf<'button'>
// const MyComponent: ComponentWithChildren<{ title: string }> = ...
