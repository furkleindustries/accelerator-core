import {
  AutoplayerPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';

const plugin: IPluginExport = {
  name: 'autoplayer',
  precedence: 0,
  content: new AutoplayerPlugin(),
};

export default plugin;
