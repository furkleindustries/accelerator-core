import {
  shallow,
} from 'enzyme';

import menu from './menu';

import * as React from 'react';

const {
  name,
  contents: Menu,
} = menu;

const testFactory = (options?: { [key: string]: any}) => (
  <Menu
    bookmark={jest.fn()}
    dispatch={jest.fn()}
    lastLinkTags={[]}
    navigateTo={jest.fn()}
    passageObject={{} as any}
    restart={jest.fn()}
    rewind={jest.fn()}
    setStoryState={jest.fn()}
    soundManager={{ generateVolumePanelElement: jest.fn() } as any}
    storyState={jest.fn()}
    {...options}
  />
);

describe('Tests for the menu header.', () => {
  it('Has a non-empty name string.', () => {
    expect(name && typeof name === 'string').toBe(true);
  });

  it('Renders shallowly without crashing.', () => {
    const func = () => shallow(testFactory());
    expect(func).not.toThrow();
  });
});
