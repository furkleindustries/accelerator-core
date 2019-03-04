import {
  MenuPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';
import {
  getNormalizedAcceleratorConfig,
} from '../../src/configuration/getNormalizedAcceleratorConfig';

export default {
  /* Only inject the debug plugin if the story is in debug mode. */
  ...(
    getNormalizedAcceleratorConfig().showMenu ?
      { contents: new MenuPlugin() } :
      {}
  ),

  name: 'Menu',
  precedence: 0,
} as IPluginExport;
