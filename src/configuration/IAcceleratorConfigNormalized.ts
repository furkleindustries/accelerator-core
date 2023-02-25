import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from './IAcceleratorAutoplayerConfigurationNormalized';
import {
  IAcceleratorColorsConfiguration,
} from './IAcceleratorColorsConfiguration';
import {
  IAcceleratorConfig,
} from './IAcceleratorConfig';
import {
  IAcceleratorDebugOptions,
} from './IAcceleratorDebugOptions';
import {
  IAcceleratorImageManagerConfigurationNormalized,
} from './IAcceleratorImageManagerConfigurationNormalized';
import {
  IAcceleratorLoggersConfiguration,
} from './IAcceleratorLoggersConfiguration';
import {
  IAcceleratorSoundManagerConfigurationNormalized,
} from './IAcceleratorSoundManagerConfigurationNormalized';
import {
  IAcceleratorStoryMetadataConfiguration,
} from './IAcceleratorStoryMetadataConfiguration';
import {
  IFontLoadingDetailsNormalized,
} from '../fonts/IFontLoadingDetailsNormalized';
import type {
  ActionTypes,
} from 'redux-undo';

export interface IAcceleratorConfigNormalized extends IAcceleratorConfig {
  readonly autoplayer: IAcceleratorAutoplayerConfigurationNormalized;
  readonly colors: IAcceleratorColorsConfiguration;
  readonly compressScriptFiles: boolean;
  readonly debugOptions: IAcceleratorDebugOptions;
  readonly fontsToLoad: readonly IFontLoadingDetailsNormalized[];
  readonly historyFramesToSerialize: number;
  readonly historySaveTypes: readonly ActionTypes[];
  readonly imageManager: IAcceleratorImageManagerConfigurationNormalized;
  readonly lintCodeFiles: boolean;
  readonly loggers: IAcceleratorLoggersConfiguration;
  readonly soundManager: IAcceleratorSoundManagerConfigurationNormalized;
  readonly storyMetadata: IAcceleratorStoryMetadataConfiguration;
  readonly warnIfDeveloperOptionsEnabled: boolean;
}
