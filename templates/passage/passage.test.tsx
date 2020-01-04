import {
  shallow,
} from 'enzyme';

jest.mock('../../src/passages/checkPassageAsset', () => ({
  __esModule: true,
  checkPassageAsset: () => true,
}));

jest.mock('../../src/passages/getPassagesMapAndStartPassageName', () => ({
  __esModule: true,
  getPassagesMapAndStartPassageName: () => ({
    passagesMap: {},
    startPassageName: '___test___',
  }),
}));

document.querySelector = jest.fn(() => ({}));

import passage from './{{{name}}}';

import {
  IPassageProps,
} from '../../bundles/passagesBundle';
import {
  BuiltInTags,
  ITag,
  getTag,
} from '../../bundles/tagsBundle';

import * as React from 'react';

const {
  name,
  tags,
  content: Component,
} = passage;

describe('Tests for the {{{name}}} passage.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('If it has tags, they are either non-empty strings or key-value objects.', () => {
    expect(!tags || tags.filter((aa: ITag) => {
      if (aa) {
        if (typeof aa === 'string') {
          return true;
        } else if (typeof aa === 'object') {
          if (aa.key &&
              typeof aa.key === 'string' &&
              typeof aa.value !== 'undefined')
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
      shallow(<Component {...getPassageMockArgs()} />);
    }
  });
});

const getPassageMockArgs = (): IPassageProps => ({
  config: {} as any,
  dispatch: jest.fn(),
  lastLinkTags: [],
  passage: {} as any,
  soundManager: {} as any,
  storyState: {},
  bookmark: jest.fn(),
  navigateTo: jest.fn(),
  restart: jest.fn(),
  rewind: jest.fn(),
  setStoryState: jest.fn(),
});
