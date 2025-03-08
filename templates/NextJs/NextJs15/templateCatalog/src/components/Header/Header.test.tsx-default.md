import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@tools/snapshotUtils';
import { Header } from './Header';

// Mock the dependencies
jest.mock('@assets/svg/MinimalLogo', () => () => <div data-testid='mock-logo'>Logo</div>);
jest.mock('./MobileNavigation', () => ({
  MobileNavigation: ({ menuContent }: { menuContent: unknown[] }) => (
    <div data-testid='mock-mobile-navigation'>{menuContent.length} items</div>
  ),
}));
jest.mock('../Button', () => ({
  ButtonLink: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid='mock-button-link'>
      {children}
    </a>
  ),
}));

// Mock the config to avoid the uuid import issues
jest.mock('@configs/config', () => ({
  __esModule: true,
  default: {
    content: {
      menu: {
        headerMenu: [
          { id: 'mock-1', title: 'Mock Item 1', url: '/mock-1' },
          { id: 'mock-2', title: 'Mock Item 2', url: '/mock-2' },
        ],
        headerCTAMenu: [
          { id: 'mock-3', title: 'Login', url: '/login' },
          { id: 'mock-4', title: 'Sign Up', url: '/signup', button: true },
        ],
      },
    },
  },
}));

// Sample menu items for testing
const sampleMenuContent = [
  { id: '1', title: 'Home', url: '/' },
  { id: '2', title: 'Features', url: '/features' },
];

const sampleMenuRightContent = [
  { id: '3', title: 'Login', url: '/login' },
  { id: '4', title: 'Sign Up', url: '/signup', button: true },
];

describe('Header', () => {
  it('renders with default props', () => {
    const { container } = render(<Header />);
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    expect(screen.getByTestId('mock-mobile-navigation')).toBeInTheDocument();
    maybeSnapshot(container);
  });

  it('renders with custom menu items', () => {
    const { container } = render(<Header menuContent={sampleMenuContent} menuRightContent={sampleMenuRightContent} />);

    // Use more specific selectors to avoid ambiguity with multiple "Home" texts
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '/features');
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');
    expect(screen.getByTestId('mock-button-link')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
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
