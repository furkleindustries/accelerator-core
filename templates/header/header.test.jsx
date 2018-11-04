import {
  shallow,
} from 'enzyme';

import header from './%NAME%';

import * as React from 'react';

const {
  name,
  contents: Component,
} = header;

describe('Tests for the %NAME% header.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('Renders shallowly without crashing.', () => {
    shallow(<Component />);
  });
});
