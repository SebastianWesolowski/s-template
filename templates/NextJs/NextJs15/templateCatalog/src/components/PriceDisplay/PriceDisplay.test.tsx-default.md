import { render, screen } from '@testing-library/react';

import { PriceDisplay } from './PriceDisplay';
import { maybeSnapshot } from '../../../tools/snapshotUtils';

describe('PriceDisplay', () => {
  it('should render formatted price', () => {
    const { container } = render(<PriceDisplay price={23.5} />);
    expect(screen.getByTestId('price-display')).toHaveTextContent('23,50 zł');
    maybeSnapshot(container);
  });

  it('should apply custom className', () => {
    const { container } = render(<PriceDisplay price={23.5} className='text-red-500' />);
    expect(screen.getByTestId('price-display')).toHaveClass('text-red-500');
    maybeSnapshot(container);
  });
});
