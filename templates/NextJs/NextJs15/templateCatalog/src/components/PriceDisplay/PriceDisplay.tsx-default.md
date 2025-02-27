import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { formatPrice } from '@utils';
import React from 'react';

const priceDisplay = cva(['font-medium', 'inline-flex', 'items-center', 'transition-colors'], {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-base'],
      lg: ['text-lg', 'font-semibold'],
      xl: ['text-xl', 'font-bold'],
    },
    intent: {
      default: ['text-gray-900'],
      primary: ['text-blue-600'],
      success: ['text-green-600'],
      warning: ['text-amber-600'],
      danger: ['text-red-600'],
    },
  },
  defaultVariants: {
    size: 'md',
    intent: 'default',
  },
});

export interface PriceDisplayProps extends VariantProps<typeof priceDisplay> {
  /**
   * The price value to be displayed
   */
  price: number;

  /**
   * Optional custom class name
   */
  className?: string;
}

/**
 * PriceDisplay component for showing formatted prices
 */
export function PriceDisplay({ price, className, size, intent }: PriceDisplayProps): React.ReactElement {
  return (
    <span className={twMerge(priceDisplay({ size, intent, className }))} data-testid='price-display'>
      {formatPrice(price)}
    </span>
  );
}
