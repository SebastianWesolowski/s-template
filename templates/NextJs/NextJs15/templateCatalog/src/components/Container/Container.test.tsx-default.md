import { render, screen } from '@testing-library/react';
import { maybeSnapshot } from '@utils';
import { Container } from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Container Content';
    const { container } = render(
      <Container>
        <div>{testContent}</div>
      </Container>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
    maybeSnapshot(container);
  });

  it('applies custom className', () => {
    const customClass = 'custom-container';
    const { container } = render(
      <Container className={customClass}>
        <div>Content</div>
      </Container>
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain(customClass);
    expect(containerDiv.className).toContain('mx-auto');
    expect(containerDiv.className).toContain('max-w-7xl');
    maybeSnapshot(container);
  });

  it('applies padding variants correctly', () => {
    const { container: containerNone } = render(
      <Container padding='none'>
        <div>Content</div>
      </Container>
    );
    const divNone = containerNone.firstChild as HTMLElement;
    expect(divNone.className).not.toContain('px-');

    const { container: containerSm } = render(
      <Container padding='sm'>
        <div>Content</div>
      </Container>
    );
    const divSm = containerSm.firstChild as HTMLElement;
    expect(divSm.className).toContain('px-4');

    const { container: containerMd } = render(
      <Container padding='md'>
        <div>Content</div>
      </Container>
    );
    const divMd = containerMd.firstChild as HTMLElement;
    expect(divMd.className).toContain('px-6');

    const { container: containerLg } = render(
      <Container padding='lg'>
        <div>Content</div>
      </Container>
    );
    const divLg = containerLg.firstChild as HTMLElement;
    expect(divLg.className).toContain('px-8');

    maybeSnapshot(containerLg);
  });

  it('applies width variants correctly', () => {
    const { container: containerNormal } = render(
      <Container width='normal'>
        <div>Content</div>
      </Container>
    );
    const divNormal = containerNormal.firstChild as HTMLElement;
    expect(divNormal.className).toContain('max-w-7xl');

    const { container: containerNarrow } = render(
      <Container width='narrow'>
        <div>Content</div>
      </Container>
    );
    const divNarrow = containerNarrow.firstChild as HTMLElement;
    expect(divNarrow.className).toContain('max-w-5xl');

    const { container: containerFull } = render(
      <Container width='full'>
        <div>Content</div>
      </Container>
    );
    const divFull = containerFull.firstChild as HTMLElement;
    expect(divFull.className).toContain('max-w-full');

    maybeSnapshot(containerFull);
  });

  it('uses default variants when none specified', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    );

    const containerDiv = container.firstChild as HTMLElement;
    // Check default padding (md)
    expect(containerDiv.className).toContain('px-6');
    // Check default width (normal)
    expect(containerDiv.className).toContain('max-w-7xl');
    maybeSnapshot(container);
  });
});
