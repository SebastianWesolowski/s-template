import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@tools/snapshotUtils';
import { BasicLayout } from './BasicLayout';

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
