/* import config from '../../accelerator.config'; */
import {
  DebugPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';
/* import {
  isInDebugMode,
} from '../../src/passages/isInDebugMode'; */

const plugin: IPluginExport = {
  name: 'debug',
  /* Always have the debug plugin execute first. */
  precedence: Number.MAX_SAFE_INTEGER,
  /* Only inject the debug plugin if the story or env are in dev mode. */
  // ...(
  //  isInDebugMode(config.debug) ?
  //    { content: new DebugPlugin() } :
  //    {}
  // ),

  // Begin Accelerate-not-Accelerator content.
  content: new DebugPlugin(),
};

export default plugin;
