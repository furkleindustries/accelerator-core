import {
  DebugPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';
import {
  getNormalizedAcceleratorConfig,
} from '../../src/configuration/getNormalizedAcceleratorConfig';

export default {
  /* Only inject the debug plugin if the story is in debug mode. */
  ...(
    getNormalizedAcceleratorConfig().debug ?
      { contents: new DebugPlugin() } :
      {}
  ),

  name: 'Debug',
  precedence: Number.MAX_SAFE_INTEGER,
} as IPluginExport;
