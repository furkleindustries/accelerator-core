/* Needed for adding JSX elements to child in beforeRender. */
import * as React from 'react';

import * as bundle from '../../src/passages/bundle';

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

  public beforePassageChange(args: bundle.plugins.IPluginMethodBaseArgs & bundle.plugins.IPluginMethodStateMutationArgs) {
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
  public beforeRender(args: bundle.plugins.IPluginMethodBaseArgs & bundle.plugins.IPluginMethodChildArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      children,
      lastLinkTags,
    } = args;
    
    return children;
  }

  public afterPassageChange(args: bundle.plugins.IPluginMethodBaseArgs & bundle.plugins.IPluginMethodStateMutationArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  public afterStoryStateChange(args: bundle.plugins.IPluginMethodBaseArgs & bundle.plugins.IPluginMethodStateChangingArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      updatedStateProps,
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
  /* string: the name of the plugin. */
  name: '%NAME%',

  /* IPlugin: the instantiated plugin object. */
  contents: new Plugin(),
};

/* Always make the plugin object a default export. */
export default plugin;
