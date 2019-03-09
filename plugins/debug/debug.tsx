import {
  DebugPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';
import {
  getNormalizedAcceleratorConfig,
} from '../../src/configuration/getNormalizedAcceleratorConfig';

const plugin: IPluginExport = {
  name: 'debug',
  /* Always have the debug plugin execute first. */
  precedence: Number.MAX_SAFE_INTEGER,
  /* Only inject the debug plugin if the story is in debug mode. */
  ...(
    getNormalizedAcceleratorConfig().debug ?
      { content: new DebugPlugin() } :
      {}
  ),
};

export default plugin;
