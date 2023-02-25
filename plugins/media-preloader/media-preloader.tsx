import {
  IPluginExport,
  MediaPreloaderPlugin,
} from '../../bundles/pluginsBundle';

const plugin: IPluginExport = {
  name: 'media-preloader',
  content: new MediaPreloaderPlugin(),
};

export default plugin;
