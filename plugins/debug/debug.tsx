import {
  DebugPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';
import {
  getNormalizedAcceleratorConfig,
} from '../../src/configuration/getNormalizedAcceleratorConfig';

const NODE_ENV = process.env.NODE_ENV;

const plugin: IPluginExport = {
  name: 'debug',
  /* Always have the debug plugin execute first. */
  precedence: Number.MAX_SAFE_INTEGER,
  /* Only inject the debug plugin if the story or env is in debug mode. */
  ...(
    getNormalizedAcceleratorConfig().debug || NODE_ENV === 'development' ?
      { content: new DebugPlugin() } :
      {}
  ),
};

export default plugin;
