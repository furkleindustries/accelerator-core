import {
  createLogger,
} from 'colorful-logging';
import config from '../../accelerator.config';
import {
  configurationDefaults,
} from './configurationDefaults';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  IAcceleratorConfig,
} from './IAcceleratorConfig';
import {
  IAcceleratorConfigNormalized,
} from './IAcceleratorConfigNormalized';
import {
  normalizeFont,
} from '../fonts/normalizeFont';

let memoized: any;

export const getNormalizedAcceleratorConfig = (): IAcceleratorConfigNormalized => {
  if (memoized) {
    return memoized;
  }

  const {
    acceleratorCoreVersion,
    acceleratorToolVersion,
    autoplayer,
    compressScriptFiles,
    coreVersion,
    debug,
    debugOptions,
    fontsToLoad,
    historyFramesToSerialize,
    historyStackLimit,
    historySaveTypes,
    imageManager,
    lintCodeFiles,
    loadAutosaveAtStart,
    publicUrl,
    showMenu = true,
    soundManager,
    startPassageName,
    storyMetadata,
    warnIfDeveloperOptionsEnabled,
  } = config;

  const loggers = createLogger();

  const baseConfiguration: Partial<IAcceleratorConfig> = {
    acceleratorCoreVersion,
    acceleratorToolVersion,
    autoplayer,
    compressScriptFiles,
    coreVersion,
    debug,
    debugOptions,
    historyFramesToSerialize,
    historyStackLimit,
    historySaveTypes,
    lintCodeFiles,
    loadAutosaveAtStart,
    loggers,
    publicUrl,
    showMenu,
    startPassageName,
    warnIfDeveloperOptionsEnabled,
  };

  memoized = {
    ...configurationDefaults,
    ...baseConfiguration,
  };

  memoized.storyMetadata.ifid = storyMetadata ?
    storyMetadata.ifid :
    configurationDefaults.storyMetadata.ifid;

  if (autoplayer) {
    if (typeof autoplayer.active === 'boolean') {
      memoized.autoplayer.active = autoplayer.active;
    }

    if (typeof autoplayer.scroll === 'boolean') {
      memoized.autoplayer.scroll = autoplayer.scroll;
    }

    if (autoplayer.baseDelayTime! > 0) {
      memoized.autoplayer.baseDelayTime = autoplayer.baseDelayTime;
    }

    if (autoplayer.minDelayRatio! > 0) {
      memoized.autoplayer.minDelayRatio = autoplayer.minDelayRatio;
    }

    if (autoplayer.maxDelayRatio! > 0) {
      memoized.autoplayer.maxDelayRatio = autoplayer.maxDelayRatio;
    }

    if (typeof autoplayer.getRandomFactor === 'function') {
      memoized.autoplayer.getRandomFactor = autoplayer.getRandomFactor;
    }

    if (typeof autoplayer.randomStrictBounding === 'boolean') {
      memoized.autoplayer.randomStrictBounding = autoplayer.randomStrictBounding;
    }
  }

  if (imageManager) {
    if (imageManager.defaultPreloadStrategies) {
      memoized.imageManager.defaultPreloadStrategies = imageManager.defaultPreloadStrategies;
    }

    if (imageManager.imagesToPreload) {
      memoized.imageManager.imagesToPreload = imageManager.imagesToPreload;
    }
  }

  if (soundManager) {
    if (typeof soundManager.exposeInMenu === 'boolean') {
      memoized.soundManager.exposeInMenu = soundManager.exposeInMenu;
    }
  
    const defaults = soundManager.defaults;
    if (defaults) {
      if (defaults.fade) {
        memoized.soundManager.defaults.fade = { ...defaults.fade };
      }

      if (typeof defaults.fadeOnLoops === 'boolean') {
        memoized.soundManager.fadeOnLoops = defaults.fadeOnLoops;
      }

      if (typeof defaults.loop === 'boolean') {
        memoized.soundManager.loop = defaults.loop;
      }

      if (typeof defaults.preload === 'boolean') {
        memoized.soundManager.preload = defaults.preload;
      }

      if (typeof defaults.volume === 'number') {
        memoized.soundManager.volume = defaults.volume;
      }
    }

    const excludeFromAutomaticStop = memoized.soundManager.excludeFromAutomaticStop;
    if (excludeFromAutomaticStop) {
      if (Array.isArray(excludeFromAutomaticStop.groups)) {
        memoized.soundManager.excludeFromAutomaticStop.groups = excludeFromAutomaticStop.groups;
      }

      if (Array.isArray(excludeFromAutomaticStop.sounds)) {
        memoized.soundManager.excludeFromAutomaticStop.sounds = excludeFromAutomaticStop.sounds;
      }
    }

    if (typeof soundManager.exposeInMenu === 'boolean') {
      memoized.soundManager.exposeInMenu = soundManager.exposeInMenu;
    }

    if (soundManager.soundsToLoad) {
      memoized.soundManager.soundsToLoad = getFrozenObject(
        soundManager.soundsToLoad,
      );
    }
  }

  if (Array.isArray(fontsToLoad)) {
    memoized.fontsToLoad = fontsToLoad.map(normalizeFont);
  }

  if (typeof config.debug !== 'boolean') {
    memoized.debug = false;
    memoized.debugOptions = Object.freeze({
      loopStartInkModule: false,
      reduxUndoDebug: false,
      noTimings: false,
      startPassageAfterMenu: '',
      startInkPathString: '',
      startInkState: {},
      storyState: {},
      stubLastPassageName: '',
    });
  }

  if (storyMetadata) {
    if (storyMetadata.appDisplayMode) {
      memoized.storyMetadata.appDisplayMode = storyMetadata.appDisplayMode;
    }

    if (storyMetadata.appOrientation) {
      memoized.storyMetadata.appOrientation = storyMetadata.appOrientation;
    }

    if (Array.isArray(storyMetadata.categories)) {
      memoized.storyMetadata.categories = [ ...storyMetadata.categories ];
    }

    if (storyMetadata.description) {
      memoized.storyMetadata.description = storyMetadata.description;
    }

    if (Array.isArray(storyMetadata.icons)) {
      memoized.storyMetadata.icons = [ ...storyMetadata.icons ];
    }

    if (storyMetadata.language) {
      memoized.storyMetadata.language = storyMetadata.language;
    }

    if (storyMetadata.languageDirectionality) {
      memoized.storyMetadata.languageDirectionality = storyMetadata.languageDirectionality;
    }

    if (Array.isArray(storyMetadata.robots)) {
      memoized.storyMetadata.robots = [ ...storyMetadata.robots ];
    }

    if (storyMetadata.scope) {
      memoized.storyMetadata.scope = storyMetadata.scope;
    }

    if (Array.isArray(storyMetadata.screenshots)) {
      memoized.storyMetadata.screenshots = [ ...storyMetadata.screenshots ];
    }

    if (Array.isArray(storyMetadata.shortcuts)) {
      memoized.storyMetadata.shortcuts = storyMetadata.shortcuts;
    }

    if (storyMetadata.startUrl) {
      memoized.storyMetadata.startUrl = storyMetadata.startUrl;
    }

    if (storyMetadata.title) {
      memoized.storyMetadata.title = storyMetadata.title;
    }
  }

  memoized = Object.freeze(memoized);

  return memoized;
};
