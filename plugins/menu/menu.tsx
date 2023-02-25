import {
  MenuPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';
import {
  getNormalizedAcceleratorConfig,
} from '../../src/configuration/getNormalizedAcceleratorConfig';

const plugin: IPluginExport = {
  /* Only inject the menu if the showMenu config property is truthy. */
  ...(
    getNormalizedAcceleratorConfig().showMenu === true ?
      { content: new MenuPlugin() } :
      {}
  ),

  name: 'menu',
  precedence: 0,
};

export default plugin;
