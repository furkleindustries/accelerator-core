import {
  configurationDefaults,
} from './configurationDefaults'
import {
  IAcceleratorSoundManagerConfiguration,
} from './IAcceleratorSoundManagerConfiguration';
import {
  IGroupsDefinitionMap,
} from '../../passages/_sounds/ISoundsDefinitionMap';

export interface IAcceleratorSoundManagerConfigurationNormalized
  extends IAcceleratorSoundManagerConfiguration
{
  readonly defaults: typeof configurationDefaults['soundManager']['defaults'];

  readonly excludeFromAutomaticStop: {
    readonly groups: string[];
    readonly sounds: string[];
  };

  readonly exposeInMenu: boolean;
  readonly soundsToLoad: IGroupsDefinitionMap;
}
