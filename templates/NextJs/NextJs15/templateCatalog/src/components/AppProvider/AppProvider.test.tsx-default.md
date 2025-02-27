import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@utils';
import { AppProvider } from './AppProvider';

// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(
      (query: string): MediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })
    ),
  });
});

describe('AppProvider', () => {
  it('renders children correctly', () => {
    const testText = 'Test Child Content';
    const { container } = render(
      <AppProvider>
        <div>{testText}</div>
      </AppProvider>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
    maybeSnapshot(container);
  });

  it('provides theme context to children', () => {
    const { container } = render(
      <AppProvider>
        <div data-testid='themed-content'>Content</div>
      </AppProvider>
    );

    // Verify the theme provider is working by checking for the class attribute
    const html = document.documentElement;
    expect(html).toHaveAttribute('class');
    maybeSnapshot(container);
  });
});
