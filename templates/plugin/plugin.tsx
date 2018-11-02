/* Needed for adding JSX elements to child in beforeRender. */
import * as React from 'react';

import * as bundle from '../../src/passages/bundle';

class Plugin implements bundle.plugins.IPlugin {
  public beforeComponentDidMount(args: bundle.plugins.IPluginMethodArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  public afterComponentDidMount(args: bundle.plugins.IPluginMethodArgs) {
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
  public beforeRender(args: bundle.plugins.IPluginMethodArgs & { child: React.ReactElement<bundle.passages.IPassageProps>}) {
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

  public beforeComponentDidUpdate(args: bundle.plugins.IPluginMethodArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  public afterComponentDidUpdate(args: bundle.plugins.IPluginMethodArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }
}

const plugin: bundle.plugins.IPluginExport = {
  /* string: the story-unique name of the header. */
  name: '%NAME%',

  /* IPlugin: the instantiated plugin object. */
  contents: new Plugin(),
};

/* Always make the plugin object a default export. */
export default plugin;
