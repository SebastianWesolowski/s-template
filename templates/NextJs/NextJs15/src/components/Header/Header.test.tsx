import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@tools/snapshotUtils';
import { Header } from './Header';

// Mock the dependencies
jest.mock('@assets/svg/MinimalLogo', () => () => <div data-testid='mock-logo'>Logo</div>);
jest.mock('./MobileNavigation', () => ({
  MobileNavigation: () => <div data-testid='mock-mobile-navigation'>Mobile Navigation</div>,
}));

describe('Header', () => {
  it('renders with default props', () => {
    const { container } = render(<Header />);
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    expect(screen.getByTestId('mock-mobile-navigation')).toBeInTheDocument();
    maybeSnapshot(container);
  });

  it('renders navigation links', () => {
    const { container } = render(<Header />);

    // Check that the logo link is present
    const logoLink = screen.getByRole('link', { name: 'Home Logo' });
    expect(logoLink).toHaveAttribute('href', '/');

    // Check that example links are present
    const exampleLinks = screen.getAllByRole('link', { name: '### example' });
    expect(exampleLinks.length).toBeGreaterThan(0);
    maybeSnapshot(container);
  });

  it('applies custom className', () => {
    const customClass = 'custom-header-class';
    const { container } = render(<Header className={customClass} />);

    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement.className).toContain(customClass);
    expect(headerElement.className).toContain('py-10');
    maybeSnapshot(container);
  });

  it('applies variant styles correctly', () => {
    const { container: filledContainer } = render(<Header variant='filled' />);
    const filledHeader = filledContainer.firstChild as HTMLElement;
    expect(filledHeader.className).toContain('bg-white');

    const { container: transparentContainer } = render(<Header variant='transparent' />);
    const transparentHeader = transparentContainer.firstChild as HTMLElement;
    expect(transparentHeader.className).toContain('bg-transparent');

    maybeSnapshot(filledContainer);
    maybeSnapshot(transparentContainer);
  });

  it('applies sticky and shadow styles correctly', () => {
    const { container } = render(<Header sticky shadow />);

    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement.className).toContain('sticky');
    expect(headerElement.className).toContain('top-0');
    expect(headerElement.className).toContain('z-40');
    expect(headerElement.className).toContain('shadow-sm');
    maybeSnapshot(container);
  });

  it('renders children correctly', () => {
    const testContent = <span data-testid='test-children'>Test Content</span>;
    const { container } = render(<Header>{testContent}</Header>);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    maybeSnapshot(container);
  });
});
