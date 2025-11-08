import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@tools/snapshotUtils';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders with default props', () => {
    const { container } = render(<Footer />);

    // Check that copyright text is present with the current year
    const currentYear = new Date().getFullYear();
    // eslint-disable-next-line security/detect-non-literal-regexp
    expect(screen.getByText(new RegExp('Copyright.*' + currentYear + '.*Wesolowski', 'i'))).toBeInTheDocument();

    // Check that GitHub link is present
    const githubLink = screen.getByRole('link', { name: /wesolowski on github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/wesolowski');

    maybeSnapshot(container);
  });

  it('renders with custom className', () => {
    const customClass = 'custom-footer-class';
    const { container } = render(<Footer className={customClass} />);

    const footerElement = container.firstChild as HTMLElement;
    expect(footerElement.className).toContain(customClass);
    expect(footerElement.className).toContain('border-t');

    maybeSnapshot(container);
  });

  it('applies spacing variants correctly', () => {
    const { container: compactContainer } = render(<Footer spacing='compact' />);
    const { container: spaciousContainer } = render(<Footer spacing='spacious' />);

    const compactFooter = compactContainer.firstChild as HTMLElement;
    const spaciousFooter = spaciousContainer.firstChild as HTMLElement;

    expect(compactFooter.className).toContain('py-6');
    expect(spaciousFooter.className).toContain('py-16');

    maybeSnapshot(compactContainer);
    maybeSnapshot(spaciousContainer);
  });

  it('applies alignment variants correctly', () => {
    const { container: leftContainer } = render(<Footer align='left' />);
    const { container: rightContainer } = render(<Footer align='right' />);

    const leftFooter = leftContainer.firstChild as HTMLElement;
    const rightFooter = rightContainer.firstChild as HTMLElement;

    expect(leftFooter.className).toContain('items-start');
    expect(rightFooter.className).toContain('items-end');

    maybeSnapshot(leftContainer);
    maybeSnapshot(rightContainer);
  });

  it('renders children correctly', () => {
    const testContent = <div data-testid='test-children'>Extra Footer Content</div>;
    const { container } = render(<Footer>{testContent}</Footer>);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Extra Footer Content')).toBeInTheDocument();

    maybeSnapshot(container);
  });

  it('renders with multiple social links', () => {
    // Create a custom Footer that extends the basic one and adds more social links
    const CustomFooter = () => (
      <Footer>
        <div className='mt-6 flex space-x-4'>
          <a href='#twitter' data-testid='twitter-link'>
            Twitter
          </a>
          <a href='#linkedin' data-testid='linkedin-link'>
            LinkedIn
          </a>
        </div>
      </Footer>
    );

    const { container } = render(<CustomFooter />);

    expect(screen.getByTestId('twitter-link')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-link')).toBeInTheDocument();

    maybeSnapshot(container);
  });
});
