/* Needed for adding JSX elements to child in beforeRender. */
import * as React from 'react';

import * as plugins from '../../src/passages/pluginsBundle';

class Plugin implements plugins.IPlugin {
  public afterStoryInit(args: plugins.IPluginMethodBaseArgs & plugins.IPluginMethodStateMutationArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  public beforePassageChange(args: plugins.IPluginMethodBaseArgs & plugins.IPluginMethodStateMutationArgs) {
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
  public beforeRender(args: plugins.IPluginMethodBaseArgs & plugins.IPluginMethodChildArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      children,
      lastLinkTags,
    } = args;
    
    return children;
  }

  public afterPassageChange(args: plugins.IPluginMethodBaseArgs & plugins.IPluginMethodStateMutationArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      setStoryState,
      store,
    } = args;
  }

  public afterStoryStateChange(args: plugins.IPluginMethodBaseArgs & plugins.IPluginMethodStateChangingArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
      updatedStateProps,
    } = args;
  }

  public beforeRestart(args: plugins.IPluginMethodBaseArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
    } = args;
  }
}

const plugin: plugins.IPluginExport = {
  /* string: the name of the plugin. */
  name: '%NAME%',

  /* IPlugin: the instantiated plugin object. */
  contents: new Plugin(),
};

/* Always make the plugin object a default export. */
export default plugin;
