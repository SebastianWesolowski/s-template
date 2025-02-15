import { formatPrice } from '@utils';

export interface PriceDisplayProps {
  price: number;
  className?: string;
}

export function PriceDisplay({ price, className }: PriceDisplayProps) {
  return (
    <span className={className} data-testid='price-display'>
      {formatPrice(price)}
    </span>
  );
}
