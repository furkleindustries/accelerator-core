import {
  DebugPlugin,
  IPluginExport,
} from '../../src/passages/pluginsBundle';
import {
  getAcceleratorConfig,
} from '../../src/configuration/getAcceleratorConfig';

export default {
  /* Only inject the debug plugin if the story is in debug mode. */
  ...(getAcceleratorConfig().debug ? { contents: new DebugPlugin() } : {}),
  name: 'Debug',
  precedence: Number.MAX_SAFE_INTEGER,
} as IPluginExport;
