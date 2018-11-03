/* Needed for adding JSX elements to child in beforeRender. */
import * as React from 'react';

import * as bundle from '../../src/passages/bundle';
import { IPluginMethodStateMutationArgs, IPluginMethodChildArgs } from '../../src/passages/pluginsBundle';

class Plugin implements bundle.plugins.IPlugin {
  public atStoryInit(args: bundle.plugins.IPluginMethodBaseArgs & bundle.plugins.IPluginMethodStateMutationArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  public beforePassageChange(args: bundle.plugins.IPluginMethodBaseArgs & IPluginMethodStateMutationArgs) {
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
  public beforeRender(args: bundle.plugins.IPluginMethodBaseArgs & IPluginMethodChildArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      children,
      lastLinkTags,
    } = args;
    
    return children;
  }

  public afterPassageChange(args: bundle.plugins.IPluginMethodBaseArgs & IPluginMethodStateMutationArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  public beforeRestart(args: bundle.plugins.IPluginMethodBaseArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
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
