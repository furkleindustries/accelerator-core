import {
  DebugPlugin,
  IPluginExport,
} from '../../src/passages/pluginsBundle';
import {
  getAcceleratorEnvVariables,
} from '../../src/configuration/getAcceleratorEnvVariables';

/* Only inject the dev plugin if the story is in dev mode. */
const maybeContents = getAcceleratorEnvVariables().debug ?
  new DebugPlugin() :
  {};

export default {
  ...maybeContents,
  name: 'Debug',
  precedence: Number.MAX_SAFE_INTEGER,
} as IPluginExport;
