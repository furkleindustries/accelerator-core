import {
  shallow,
} from 'enzyme';

import option from './{{{name}}}';

import * as React from 'react';

const {
  name,
  content: Option,
} = option;

describe('Tests for the {{{name}}} option.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('Renders shallowly without crashing.', () => {
    shallow(<Option />);
  });
});
