import { cleanup, render, screen } from '@testing-library/react';

import { maybeSnapshot } from '@utils';
import { Button } from '.';

describe('Button', () => {
  const defaultProps = {
    href: '#',
    children: 'Click me',
  };

  afterEach(cleanup);

  it('renders with default props', () => {
    const { container } = render(<Button {...defaultProps} />);
    const button = screen.getByRole('link');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveAttribute('href', '#');
    maybeSnapshot(container);
  });

  it('applies small size', () => {
    const { container } = render(<Button {...defaultProps} size='sm' />);
    expect(screen.getByRole('link')).toHaveClass('min-h-10');
    maybeSnapshot(container);
  });

  it('applies large size', () => {
    const { container } = render(<Button {...defaultProps} size='lg' />);
    expect(screen.getByRole('link')).toHaveClass('min-h-12');
    maybeSnapshot(container);
  });

  it('applies primary intent', () => {
    const { container } = render(<Button {...defaultProps} intent='primary' />);
    expect(screen.getByRole('link')).toHaveClass('bg-blue-400');
    maybeSnapshot(container);
  });

  it('applies secondary intent', () => {
    const { container } = render(<Button {...defaultProps} intent='secondary' />);
    expect(screen.getByRole('link')).toHaveClass('bg-transparent');
    maybeSnapshot(container);
  });

  it('applies underline when specified', () => {
    const { container } = render(<Button {...defaultProps} underline />);
    expect(screen.getByRole('link')).toHaveClass('underline');
    maybeSnapshot(container);
  });

  it('merges custom className with default classes', () => {
    const { container } = render(<Button {...defaultProps} className='custom-class' />);
    const button = screen.getByRole('link');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('justify-center');
    maybeSnapshot(container);
  });
});
