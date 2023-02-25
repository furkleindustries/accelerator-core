import {
  shallow,
} from 'enzyme';

import footer from './noise-sound';

import * as React from 'react';

const {
  name,
  content: Component,
} = footer;

describe('Tests for the noise-sound footer.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('Renders shallowly without crashing.', () => {
    shallow(<Component />);
  });
});
