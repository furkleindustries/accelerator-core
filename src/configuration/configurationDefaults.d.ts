import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IAcceleratorDebugOptions,
} from './IAcceleratorDebugOptions';
import {
  IAcceleratorImageManagerConfigurationNormalized,
} from './IAcceleratorImageManagerConfigurationNormalized';
import {
  IAcceleratorStoryMetadataConfiguration,
} from './IAcceleratorStoryMetadataConfiguration';
import {
  IFontLoadingDetails,
} from '../fonts/IFontLoadingDetails';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import type {
  EasingCurves,
} from 'sound-manager';

export declare const EasingCurvesMirror: {
  Linear: 'linear',
  Quadratic: 'quadratic',
  EqualPower: 'equalPower',
  Cubic: 'cubic',
  Quartic: 'quartic',
  Quintic: 'quintic',
  Exponential: 'exponential',
};

export declare const configurationDefaults: {
  readonly autoplayer: {
    readonly active: boolean;
    readonly baseDelayTime: number;
    readonly getRandomFactor: () => number;
    readonly minDelayRatio: number;
    readonly maxDelayRatio: number;
    readonly randomStrictBounding: boolean;
    readonly scroll: boolean;
  };

  readonly colors: {
    readonly background: string;
    readonly theme: string;
  };

  readonly debug: boolean;
  readonly debugOptions: IAcceleratorDebugOptions;
  readonly fontsToLoad?: MaybeReadonlyArray<IFontLoadingDetails> | string;
  readonly historyFramesToSave: number;
  readonly historySaveTypes: ActionTypes[];
  readonly historyStackLimit: number;

  readonly imagesManager: IAcceleratorImageManagerConfigurationNormalized;

  /* This path must be relative to the config, not this defaults file. */
  readonly publicUrl: string;

  readonly compressScriptFiles: boolean;

  readonly showMenu: boolean;

  readonly soundManager: {  
    readonly defaults: {
      readonly fade: {
        readonly easingCurve: {
          readonly in: EasingCurves;
          readonly out: EasingCurves;
        };

        readonly length: {
          readonly in: number;
          readonly out: number;
        };
      };

      readonly fadeOnLoops: boolean;
      readonly loop: boolean;
      readonly preload: boolean;
      readonly volume: number;
    };

    readonly excludeFromAutomaticStop: {
      readonly groups: string[];
      readonly sounds: string[];
    };

    readonly exposeInMenu: boolean,
  };

  readonly storyMetadata: IAcceleratorStoryMetadataConfiguration;
  readonly warnIfDeveloperOptionsEnabled: boolean;
};
