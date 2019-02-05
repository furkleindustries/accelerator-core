import pluginExport from './%name%';

const {
  name,
  contents: plugin,
} = pluginExport;

describe('Tests for the %name% plugin.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('Has a plugin object.', () => {
    expect(plugin && typeof plugin === 'object');
  });

  it('Has one of the lifecycle methods.', () => {
    let count = 0;
    const methods = [
      'afterStoryInit',
      'beforePassageChange',
      'beforeRender',
      'afterPassageChange',
      'beforeRestart',
    ];

    methods.forEach((method) => {
      if (typeof plugin[method] === 'function') {
        count += 1;
      }
    });

    expect(count).toBeGreaterThan(0);
  });
});
