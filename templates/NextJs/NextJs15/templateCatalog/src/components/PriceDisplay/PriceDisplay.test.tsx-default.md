import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@utils';
import { PriceDisplay } from './PriceDisplay';

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

  it('should render with different sizes', () => {
    const { rerender, container: smallContainer } = render(<PriceDisplay price={99.99} size='sm' />);
    expect(screen.getByTestId('price-display')).toHaveClass('text-sm');
    maybeSnapshot(smallContainer);

    rerender(<PriceDisplay price={99.99} size='md' />);
    const mediumElement = screen.getByTestId('price-display');
    expect(mediumElement).toHaveClass('text-base');
    maybeSnapshot(document.body);

    rerender(<PriceDisplay price={99.99} size='lg' />);
    const largeElement = screen.getByTestId('price-display');
    expect(largeElement).toHaveClass('text-lg');
    maybeSnapshot(document.body);

    rerender(<PriceDisplay price={99.99} size='xl' />);
    const xlElement = screen.getByTestId('price-display');
    expect(xlElement).toHaveClass('text-xl');
    maybeSnapshot(document.body);
  });

  it('should render with different intents', () => {
    const { rerender, container: defaultContainer } = render(<PriceDisplay price={99.99} intent='default' />);
    expect(screen.getByTestId('price-display')).toHaveClass('text-gray-900');
    maybeSnapshot(defaultContainer);

    rerender(<PriceDisplay price={99.99} intent='primary' />);
    const primaryElement = screen.getByTestId('price-display');
    expect(primaryElement).toHaveClass('text-blue-600');
    maybeSnapshot(document.body);

    rerender(<PriceDisplay price={99.99} intent='success' />);
    const successElement = screen.getByTestId('price-display');
    expect(successElement).toHaveClass('text-green-600');
    maybeSnapshot(document.body);

    rerender(<PriceDisplay price={99.99} intent='warning' />);
    const warningElement = screen.getByTestId('price-display');
    expect(warningElement).toHaveClass('text-amber-600');
    maybeSnapshot(document.body);

    rerender(<PriceDisplay price={99.99} intent='danger' />);
    const dangerElement = screen.getByTestId('price-display');
    expect(dangerElement).toHaveClass('text-red-600');
    maybeSnapshot(document.body);
  });

  it('should combine size and intent variants', () => {
    const { container } = render(<PriceDisplay price={99.99} size='lg' intent='primary' />);
    expect(screen.getByTestId('price-display')).toHaveClass('text-lg');
    expect(screen.getByTestId('price-display')).toHaveClass('text-blue-600');
    maybeSnapshot(container);
  });

  // Removed accessibility test since jest-axe is not available
});
