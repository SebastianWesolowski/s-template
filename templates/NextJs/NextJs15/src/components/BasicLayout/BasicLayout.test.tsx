import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@utils';
import { BasicLayout } from './BasicLayout';

// Mock the dependencies
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

// Ensure Header and Footer are properly mocked
jest.mock('@components/Header', () => ({
  Header: () => <header data-testid='mock-header'>Header</header>,
}));

jest.mock('@components/Footer', () => ({
  Footer: () => <footer data-testid='mock-footer'>Footer</footer>,
}));

describe('BasicLayout', () => {
  it('renders children with header and footer', () => {
    const testContent = 'Test Content';
    const { container } = render(
      <BasicLayout>
        <main>{testContent}</main>
      </BasicLayout>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    maybeSnapshot(container);
  });

  it('applies custom className', () => {
    const customClass = 'custom-layout';
    const { container } = render(
      <BasicLayout className={customClass}>
        <main>Content</main>
      </BasicLayout>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.className).toContain(customClass);
    expect(layoutDiv.className).toContain('min-h-screen');
    expect(layoutDiv.className).toContain('flex');
    expect(layoutDiv.className).toContain('flex-col');
    maybeSnapshot(container);
  });

  it('maintains proper layout structure', () => {
    const { container } = render(
      <BasicLayout>
        <main>Main Content</main>
      </BasicLayout>
    );

    const layoutDiv = container.firstChild as HTMLElement;
    expect(layoutDiv.children[0]).toHaveAttribute('data-testid', 'mock-header');
    expect(layoutDiv.children[1]).toHaveTextContent('Main Content');
    expect(layoutDiv.children[2]).toHaveAttribute('data-testid', 'mock-footer');
    maybeSnapshot(container);
  });
});
