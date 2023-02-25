import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from '../configuration/IAcceleratorAutoplayerConfigurationNormalized';
import {
  IDispatchAware,
} from '../interfaces/IDispatchAware';
import {
  IHistoryAware,
} from '../interfaces/IHistoryAware';
import {
  IPassageAware,
} from '../interfaces/IPassageAware';
import {
  IPluginsAware,
} from '../interfaces/IPluginsAware';
import {
  ISoundManagerAware,
} from '../interfaces/ISoundManagerAware';
import {
  IStoryStateFrame,
} from './IStoryStateFrame';

export interface IMutateStoryStateWithPluginArgs
  extends
    IDispatchAware,
    IHistoryAware,
    IPassageAware,
    IPluginsAware,
    ISoundManagerAware
{
  readonly autoplayerState: IAcceleratorAutoplayerConfigurationNormalized;
  readonly updatedStateProps: Partial<IStoryStateFrame>;
}
