import {
  shallow,
} from 'enzyme';

import pluginExport from './%NAME%';

const {
  name,
  contents: plugin,
} = pluginExport;

describe('Tests for the %NAME% header.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('Has a plugin object.', () => {
    expect(plugin && typeof plugin === 'object');
  });

  it('Has one of the lifecycle methods.', () => {
    let count = 0;
    const methods = [
      'beforeComponentDidMount',
      'afterComponentDidMount',
      'beforeRender',
      'beforeComponentDidUpdate',
      'afterComponentDidUpdate',
    ];

    methods.forEach((method) => {
      if (typeof plugin[method] === 'function') {
        count += 1;
      }
    });

    expect(count).toBeGreaterThan(0);
  });
});
