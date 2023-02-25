import {
  IAcceleratorAutoplayerConfiguration,
} from './IAcceleratorAutoplayerConfiguration';
import {
  IAcceleratorColorsConfiguration,
} from './IAcceleratorColorsConfiguration';
import {
  IAcceleratorDebugOptions,
} from './IAcceleratorDebugOptions';
import {
  IAcceleratorImageManagerConfiguration,
} from './IAcceleratorImageManagerConfiguration';
import {
  IAcceleratorLoggersConfiguration,
} from './IAcceleratorLoggersConfiguration';
import {
  IAcceleratorSoundManagerConfiguration,
} from './IAcceleratorSoundManagerConfiguration';
import {
  IAcceleratorStoryMetadataConfiguration,
} from './IAcceleratorStoryMetadataConfiguration';
import {
  InteractiveFictionIdentifierAware,
} from '../interfaces/InteractiveFictionIdentifierAware';
import {
  IFontLoadingDetails,
} from '../fonts/IFontLoadingDetails';
import {
  PassageNames,
} from '../passages/IPassagesMap';
import {
  ITaggable,
} from '../interfaces/ITaggable';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  ActionTypes
} from 'redux-undo';

export interface IAcceleratorConfig extends ITaggable {
  readonly acceleratorCoreVersion: string;
  readonly acceleratorToolVersion: string;
  readonly compressScriptFiles: boolean;
  readonly coreVersion: string;
  readonly debug: boolean;
  readonly historyStackLimit: number;
  readonly historySaveTypes: MaybeReadonlyArray<ActionTypes>;
  readonly language: string;
  readonly loadAutosaveAtStart: boolean;
  readonly loggers: Partial<IAcceleratorLoggersConfiguration>;
  readonly publicUrl: string;
  readonly showMenu: boolean;
  readonly startPassageName: PassageNames;
  readonly storyMetadata: Partial<IAcceleratorStoryMetadataConfiguration> & InteractiveFictionIdentifierAware;
  readonly autoplayer?: Partial<IAcceleratorAutoplayerConfiguration>;
  readonly colors?: Partial<IAcceleratorColorsConfiguration>;
  readonly debugOptions?: Partial<IAcceleratorDebugOptions>;
  readonly historyFramesToSerialize?: number;
  readonly imageManager?: Partial<IAcceleratorImageManagerConfiguration>;
  readonly lintCodeFiles?: boolean;
  readonly soundManager?: Partial<IAcceleratorSoundManagerConfiguration>;
  readonly fontsToLoad?: MaybeReadonlyArray<IFontLoadingDetails> | string;
  readonly warnIfDeveloperOptionsEnabled?: boolean;
}
