export const maybeSnapshot = (container: HTMLElement) => {
  if (process.env.TEST_WITH_SNAPSHOTS) {
    expect(container).toMatchSnapshot();
  }
};
