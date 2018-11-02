/* Needed for adding JSX elements to child in beforeRender. */
import * as React from 'react';

import * as bundle from '../../src/passages/bundle';

// @ts-ignore
import _styles from './%NAME%.scss';
const styles = _styles || {};

class Plugin {
  beforeComponentDidMount(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  afterComponentDidMount(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  /* The beforeRender method gets one extra argument compared to the other methods:
   * child, the rendered passage, and returns this same element after any
   * modification. */
  beforeRender(args) {
    const {
      currentPassageObject,
      currentStoryState,
      child,
      lastLinkTags,
      setStoryState,
      store,
    } = args;

    return child;
  }

  beforeComponentDidUpdate(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  afterComponentDidUpdate(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }
}

const plugin = {
  /* string: the story-unique name of the header. */
  name: '%NAME%',

  /* IPlugin: the instantiated plugin object. */
  contents: new Plugin(),
};

/* Always make the plugin object a default export. */
export default plugin;
