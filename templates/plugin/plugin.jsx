/* Needed for adding JSX elements to child in beforeRender. */
import * as React from 'react';

class Plugin {
  afterStoryInit(args) {
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

  /* The beforeRender method gets one unique argument compared to the other
   * methods: children, the rendered passage, headers, and footers, and
   * returns this same element after any modification. */
  beforeRender(args) {
    const {
      children,
      currentPassageObject,
      currentStoryState,
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

  afterStoryStateChange(args) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      updatedStateProps,
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
  /* string: the name of the plugin. */
  name: '{{{name}}}',

  /* IPlugin: the instantiated plugin object. */
  content: new Plugin(),
};

/* Always make the plugin object a default export. */
export default plugin;
