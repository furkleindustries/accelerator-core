import type {
  IFade,
} from 'sound-manager';
import {
  IGroupsDefinitionMap,
} from '../../passages/_sounds/ISoundsDefinitionMap';

export interface IAcceleratorSoundManagerConfiguration {
  readonly defaults?: {
    readonly fade?: IFade;
    readonly fadeOnLoops?: boolean;
    readonly loop?: boolean;
    readonly preload?: boolean;
    readonly volume?: number;
  };

  readonly excludeFromAutomaticStop?: {
    readonly groups: readonly string[];
    readonly sounds: readonly string[];
  };

  readonly exposeInMenu?: boolean;
  readonly soundsToLoad?: IGroupsDefinitionMap;
}
