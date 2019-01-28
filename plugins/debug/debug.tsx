import {
  DebugPlugin,
  IPluginExport,
} from '../../src/passages/pluginsBundle';
import {
  isDev,
} from '../../src/functions/isDev';

/* Only inject the dev plugin if the story is in dev mode. */
const maybeContents = isDev() ? new DebugPlugin() : {};

export default {
  ...maybeContents,
  name: 'Debug',
  precedence: Number.MAX_SAFE_INTEGER,
} as IPluginExport;
