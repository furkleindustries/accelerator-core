import {
  ActionTypes,
} from './src/actions/ActionTypes';
import {
  configurationDefaults,
  EasingCurvesMirror as EasingCurves,
} from './src/configuration/configurationDefaults';
import {
  FontFormats,
} from './src/fonts/FontFormats';
import {
  FontRanges,
} from './src/fonts/FontRanges';
import {
  FontStyles,
} from './src/fonts/FontStyles';
import {
  getImagePreloadMap,
} from './passages/_images/getImagePreloadMap';
import {
  getSoundGroupsMap,
} from './passages/_sounds/getSoundGroupsMap';
import {
  MediaPreloadStrategies,
} from './src/configuration/MediaPreloadStrategies';

const debug = false;
const publicUrl = '';

const configSubset = {
  debug,
  publicUrl,
};

export default {
  startPassageName: 'start',
  debug,
  debugOptions: {
    storyState: {
      // confused_score: Math.round(Math.random() * 5),
      // convert_score: Math.round(Math.random() * 5),
      /// resister_score: Math.round(Math.random() * 5),
    },

    // startPassageAfterMenu: 'XLR8R_RANDOM',
    // stubLastPassageName: '',
    // startInkPathString: '',
    // loopStartInkModule: true,
    // noTimings: false,
  },

  loadAutosaveAtStart: true,

  autoplayer: {
    active: false,
    scroll: false,
    baseDelayTime: 35000,
    minDelayRatio: 0.75,
    maxDelayRatio: 20,
    getRandomFactor: () => Math.random() / 5 + 1,
    randomStrictBounding: false,
  },

  storyMetadata: {
    title: 'Accelerate',
    description: 'This game could be your life, and it might.',
    ifid: 'adefaced-beef-babe-fade-gaggedfacade',
    appDisplayMode: 'fullscreen',
    appOrientation: 'any',
    language: 'en',
    languageDirectionality: 'auto',
    screenshots: [],
    shortcuts: [],
    categories: [
      'entertainment',
      'games',
    ],

    icons: [
      {
        src: 'images/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
      },

      {
        src: 'images/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },

      {
        src: 'images/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },

      {
        src: 'images/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },

      {
        src: 'images/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },

      {
        src: 'images/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },

      {
        src: 'images/apple-icon-precomposed.png',
        sizes: '512x512',
        purpose: 'any maskable',
        type: 'image/png',
      },
    ],

    robots: [
      // implies [ 'robots', 'noindex' ]
      'noindex',
      // [ 'googlebot', 'noarchive' ]
    ],
  },

  colors: {
    background: '#181844',
    theme: '#a0804a',
  },

  showMenu: true,

  soundManager: {
    defaults: {
      ...configurationDefaults.soundManager.defaults,
    },

    excludeFromAutomaticStop: {
      groups: [],
      sounds: [
        'noise',
      ],
    },

    exposeInMenu: true,

    soundsToLoad: Object.freeze(
      getSoundGroupsMap(
        { ...configurationDefaults.soundManager.defaults },
        configSubset,
      ),
    ),
  },

  imageManager: {
    imagesToPreload: {
      ...getImagePreloadMap(
        (imageName) => {
          if (imageName === 'logo-one' || imageName === 'noise_1280x1280_1') {
            return MediaPreloadStrategies.PreloadFull;
          } else if (imageName.startsWith('logo') ||
            imageName.startsWith('chapter-00-'))
          {
            return MediaPreloadStrategies.PreloadDeferred;
          }

          return MediaPreloadStrategies.None;
        },

        configSubset,
      ),
    },
  },

  fontsToLoad: [
    {
      // Default font.
      family: 'Libre Franklin',
      formats: [
        FontFormats.WOFF2,
        FontFormats.WOFF,
      ],

      styles: [
        FontStyles.Normal,
      ],

      ranges: [
        // All needed in content.
        FontRanges.Latin,
        FontRanges.LatinExtended,
        FontRanges.Cyrillic,
        FontRanges.CyrillicExtended,
        FontRanges.Greek,
        FontRanges.GreekExtended,
        FontRanges.Vietnamese,
      ],

      weights: [
        300,
        400,
        500,
      ],
    },

    {
      family: 'Noto Sans',
      formats: [
        FontFormats.WOFF2,
        FontFormats.WOFF,
      ],

      styles: [
        FontStyles.Italic,
      ],

      ranges: [
        // All needed for titles.
        FontRanges.Latin,
        FontRanges.LatinExtended,
        FontRanges.Cyrillic,
        FontRanges.CyrillicExtended,
        FontRanges.Greek,
        FontRanges.GreekExtended,
        FontRanges.Vietnamese,
      ],

      weights: [
        400,
        // No Noto Sans 500 weight available.
      ],
    },

    {
      family: 'Inconsolata',
      formats: [
        FontFormats.WOFF2,
        FontFormats.WOFF,
      ],

      styles: [
        FontStyles.Normal,
      ],

      ranges: [
        FontRanges.Latin,
        FontRanges.LatinExtended,
      ],

      weights: [
        400,
      ],
    },
  ],

  publicUrl,

  compressScriptFiles: false,
  lintCodeFiles: true,
  warnIfDeveloperOptionsEnabled: true,

  historyStackLimit: 100,
  historyFramesToSerialize: 25,
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
  ],

  acceleratorCoreVersion: '0.14.1',
  acceleratorToolVersion: '0.4.1',
};

////////////////////////////////////////
//                                    //
//  hello hacker fucker               //
//  this is venus wormwood            //
//  heres the deal.                   //
//  if you hack this game             //
//  thats really fine                 //
//  its released as CC0               //
//  you wont even need to mention me  //
//  and thats a promise               //
//                                    //
////////////////////////////////////////
