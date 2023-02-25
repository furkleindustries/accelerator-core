import {
  configurationDefaults,
} from '../../src/configuration/configurationDefaults';
import {
  MediaPreloadStrategies,
} from '../../src/configuration/MediaPreloadStrategies';

// Makes the non-normalized config variables available in index.html.
export const getTemplatingData = (config) => {
  const {
    colors,
    debug,
    debugOptions,
    imageManager: {
      imagesToPreload: imagesToPreloadObj,
    },

    fontsToLoad: fontsToLoadObj,
    publicUrl: rawPublicUrl,
    storyMetadata,
  } = config;

  const fontsToLoad = JSON.stringify(fontsToLoadObj);
  const imagesToPreload = Object.values(imagesToPreloadObj).filter((img) => (
    img.preloadStrategy === MediaPreloadStrategies.PreloadFull
  ));

  const inDevMode = process.env.NODE_ENV === 'development';

  let publicUrl = (rawPublicUrl || '').trim();
  if (!publicUrl) {
    publicUrl = './';
  }

  return {
    ...{
      ...configurationDefaults.colors,
      ...colors,
    },

    ...{
      ...configurationDefaults.storyMetadata,
      ...storyMetadata,
    },

    debug,
    debugOptions,
    fontsToLoad,
    imagesToPreload,
    inDevMode,
    publicUrl,
    rootCustomProperties:
      `--color-theme:${colors.theme || configurationDefaults.colors.theme}; ` +
        `--color-background:${colors.background || configurationDefaults.colors.background}; ` +
        '--color-title-animation-one:#181844; ' +
        '--color-title-animation-two:#b8a5b8; ' +
        '--color-title-animation-three:#c03510;',
  };
};
