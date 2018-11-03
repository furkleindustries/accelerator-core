/* Needed for adding JSX elements to child in beforeRender. */
import * as React from 'react';

import * as bundle from '../../src/passages/bundle';
import { IPluginMethodStateMutationArgs, IPluginMethodChildArgs } from '../../src/passages/pluginsBundle';

class Plugin {
  atStoryInit(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  beforePassageChange(args) {
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
      children,
      lastLinkTags,
    } = args;
    
    return children;
  }

  afterPassageChange(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  beforeRestart(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
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
