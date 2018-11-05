import * as plugins from '../../src/passages/pluginsBundle';

const plugin: plugins.IPluginExport = {
  name: 'Debug',
  precedence: Number.MAX_SAFE_INTEGER,
  contents: process &&
            process.env &&
            process.env.NODE_ENV === 'development' &&
            process.env.ACCELERATOR_DEBUG === 'true' ?
              new plugins.DebugPlugin() :
              null,
};

export default plugin;
