import {
  getRandomNoiseImageUrl,
} from '../../passages/_images/getRandomNoiseImageUrl';
import {
  IAcceleratorConfigNormalized,
} from '../../src/configuration/IAcceleratorConfigNormalized';
import {
  IPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';

class NoiseCssPropertiesPlugin implements IPlugin {
  public readonly afterStoryInit: IPlugin['afterStoryInit'] = ({ config }) => {
    this.updateDocument(config);
  };

  public readonly afterPassageChange: IPlugin['afterPassageChange'] = ({ config }) => {
    this.updateDocument(config);
  };

  public readonly updateDocument = (config: IAcceleratorConfigNormalized) => {
    const randUrls = [
      getRandomNoiseImageUrl(config, '1280'),
      getRandomNoiseImageUrl(config, '1280'),
    ].map((url) => {
      if (url.startsWith('images/noise_')) {
        return `../../${url}`;
      }

      return url;
    });

    (document.firstElementChild as any).style.setProperty(
      '--noise-background-image-app-bar',
      `url("${randUrls[0]}")`,
    );

    (document.firstElementChild as any).style.setProperty(
      '--noise-background-image-body',
      `url("${randUrls[1]}")`,
    );
  };
}

const plugin: IPluginExport = {
  content: new NoiseCssPropertiesPlugin(),
  name: 'noise-css-properties',
  precedence: 1,
};

export default plugin;
