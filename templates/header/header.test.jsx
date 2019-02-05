import {
  shallow,
} from 'enzyme';

import header from './%name%';

import * as React from 'react';

const {
  name,
  contents: Component,
} = header;

describe('Tests for the %name% header.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('Renders shallowly without crashing.', () => {
    shallow(<Component />);
  });
});
