import {
  shallow,
} from 'enzyme';

import * as React from 'react';

import AuthoringPassage from './{{{name}}}.mdx';

describe('Tests for the {{{name}}} authoring passage.', () => {
  it('Renders shallowly without crashing.', () => {
    shallow(<AuthoringPassage />);
  });
});
