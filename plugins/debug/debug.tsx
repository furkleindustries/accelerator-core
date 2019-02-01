import {
  DebugPlugin,
  IPluginExport,
} from '../../src/passages/pluginsBundle';
import {
  getAcceleratorConfig,
} from '../../src/configuration/getAcceleratorConfig';

/* Only inject the dev plugin if the story is in dev mode. */
const maybeContents = getAcceleratorConfig().debug ?
  new DebugPlugin() :
  {};

export default {
  ...maybeContents,
  name: 'Debug',
  precedence: Number.MAX_SAFE_INTEGER,
} as IPluginExport;
