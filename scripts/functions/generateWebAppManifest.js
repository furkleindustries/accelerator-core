import {
  configurationDefaults,
} from '../../src/configuration/configurationDefaults';

import config from '../../accelerator.config';

const {
  colors,
  publicUrl,
  storyMetadata: storyMetadataRaw,
} = config;

export const generateWebAppManifest = () => {
  const {
    background: backgroundColor,
    theme: themeColor,
  } = {
    ...configurationDefaults.colors,
    ...colors,
  };

  const {
    appDisplayMode,
    appOrientation,
    categories,
    description,
    icons,
    language,
    languageDirectionality,
    scope,
    screenshots,
    shortcuts,
    startUrl,
    title,
  } = {
    ...configurationDefaults.storyMetadata,
    ...storyMetadataRaw,
  };

  const {
    colors: {
      background: defaultBackgroundColor,
      theme: defaultThemeColor,
    },

    storyMetadata: {
      appDisplayMode: defaultAppDisplayMode,
      appOrientation: defaultAppOrientation,
      description: defaultDescription,
      icons: defaultIcons,
      language: defaultLanguage,
      languageDirectionality: defaultLanguageDirectionality,
      screenshots: defaultScreenshots,
      shortcuts: defaultShortcuts,
      title: defaultTitle,
    },
  } = configurationDefaults;

  const defaultScope = publicUrl || '/';
  const defaultStartUrl = defaultScope;

  const webAppManifest = {
    background_color: backgroundColor || defaultBackgroundColor,
    categories: [
      ...(categories.length ? categories : defaultCategories),
    ],

    description: description || defaultDescription,
    dir: languageDirectionality || defaultLanguageDirectionality,
    display: appDisplayMode || defaultAppDisplayMode,
    icons: [
      ...(icons.length ? icons : defaultIcons),
    ],

    lang: language || defaultLanguage,
    name: title || defaultTitle,
    orientation: appOrientation || defaultAppOrientation,
    scope: scope || defaultScope,
    screenshots: [
      ...(screenshots.length ? screenshots : defaultScreenshots),
    ],

    short_name: title || defaultTitle,
    shortcuts: [
      ...(shortcuts.length ? shortcuts : defaultShortcuts),
    ],

    start_url: startUrl || defaultStartUrl,
    theme_color: themeColor || defaultThemeColor,
  };

  return webAppManifest;
};
