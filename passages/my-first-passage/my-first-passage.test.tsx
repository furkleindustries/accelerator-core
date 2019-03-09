import {
  shallow,
} from 'enzyme';

import passage from './my-first-passage';

import {
  BuiltInTags,
  getTag,
  Tag,
} from '../../bundles/tagsBundle';

import * as React from 'react';

const {
  name,
  tags,
  content: Component,
} = passage;

describe('Tests for the my-first-passage passage.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('If it has tags, they are either non-empty strings or key-value objects.', () => {
    expect(!tags || tags.filter((aa: Tag) => {
      if (aa) {
        if (typeof aa === 'string') {
          return true;
        } else if (typeof aa === 'object') {
          if (aa.key &&
              typeof aa.key === 'string' &&
              aa.value &&
              typeof aa.value === 'string')
          {
            return true;
          }
        }
      }

      return false;
    }).length === tags.length).toBe(true);
  });

  it('Renders shallowly without crashing.', () => {
    /* Don't test if it's a noRender passage. */
    if (getTag(tags, BuiltInTags.NoRender)) {
      shallow(<Component />);
    }
  });
});
