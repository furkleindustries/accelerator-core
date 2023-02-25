import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  v4,
} from 'uuid';

export const EasingCurvesMirror = {
  Linear: 'linear',
  Quadratic: 'quadratic',
  EqualPower: 'equalPower',
  Cubic: 'cubic',
  Quartic: 'quartic',
  Quintic: 'quintic',
  Exponential: 'exponential',
};

export const configurationDefaults = {
  autoplayer: {
    active: false,
    baseDelayTime: 20000,
    getRandomFactor: () => Math.random() / 6 + 1,
    maxDelayRatio: 15,
    minDelayRatio: 0.5,
    randomStrictBounding: false,
    scroll: true,
  },

  colors: {
    background: '#181844',
    theme: '#a0804a',
  },

  compressScriptFiles: false,
  debug: false,
  debugOptions: {},
  fontsToLoad: [],
  historyFramesToSerialize: 5,
  historySaveTypes: [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
  ],
  
  historyStackLimit: 500,
  imageManager: {
    imagesToPreload: {},
  },

  lintCodeFiles: false,

  /* This path must be relative to the config, not this defaults file. */
  publicUrl: '',

  showMenu: true,
  soundManager: {  
    defaults: {
      fade: {
        easingCurve: {
          in: EasingCurvesMirror.Quadratic,
          out: EasingCurvesMirror.Quadratic,
        },

        length: {
          in: 5000,
          out: 3500,
        },
      },

      fadeOnLoops: false,
      loop: true,
      preload: false,
      volume: 0.6,
    },
  
    excludeFromAutomaticStop: {
      groups: [],
      sounds: [],
    },

    exposeInMenu: true,
  },

  storyMetadata: {
    appDisplayMode: 'fullscreen',
    appOrientation: 'any',
    categories: [
      'entertainment',
      'games',
    ],

    description: 'A story made with Accelerator.',
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

    ifid: v4(),
    language: 'en',
    languageDirectionality: 'auto',
    screenshots: [],
    shortcuts: [],
    title: 'Untitled Accelerator Story',
  },

  warnIfDeveloperOptionsEnabled: true,
};
