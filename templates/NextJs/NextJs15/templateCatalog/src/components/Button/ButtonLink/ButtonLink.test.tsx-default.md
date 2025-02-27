import { cleanup, render, screen } from '@testing-library/react';

import { maybeSnapshot } from '@utils';
import { ButtonLink } from '.';

describe('ButtonLink', () => {
  const defaultProps = {
    href: '#',
    children: 'Click me',
  };

  afterEach(cleanup);

  it('renders with default props', () => {
    const { container } = render(<ButtonLink {...defaultProps} />);
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Click me');
    expect(link).toHaveAttribute('href', '#');
    maybeSnapshot(container);
  });

  it('applies small size', () => {
    const { container } = render(<ButtonLink {...defaultProps} size='sm' />);
    expect(screen.getByRole('link')).toHaveClass('min-h-10');
    maybeSnapshot(container);
  });

  it('applies large size', () => {
    const { container } = render(<ButtonLink {...defaultProps} size='lg' />);
    expect(screen.getByRole('link')).toHaveClass('min-h-12');
    maybeSnapshot(container);
  });

  it('applies primary intent', () => {
    const { container } = render(<ButtonLink {...defaultProps} intent='primary' />);
    expect(screen.getByRole('link')).toHaveClass('bg-blue-400');
    maybeSnapshot(container);
  });

  it('applies secondary intent', () => {
    const { container } = render(<ButtonLink {...defaultProps} intent='secondary' />);
    expect(screen.getByRole('link')).toHaveClass('bg-transparent');
    maybeSnapshot(container);
  });

  it('applies underline when specified', () => {
    const { container } = render(<ButtonLink {...defaultProps} underline />);
    expect(screen.getByRole('link')).toHaveClass('underline');
    maybeSnapshot(container);
  });

  it('merges custom className with default classes', () => {
    const { container } = render(<ButtonLink {...defaultProps} className='custom-class' />);
    const link = screen.getByRole('link');

    expect(link).toHaveClass('custom-class');
    expect(link).toHaveClass('justify-center');
    maybeSnapshot(container);
  });
});
