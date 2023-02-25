import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from '../../configuration/IAcceleratorAutoplayerConfigurationNormalized';
import {
  IHistoryAware,
} from '../../interfaces/IHistoryAware';

export interface ICyclingLinkInternalStateProps extends IHistoryAware
{
  readonly autoplayerState: IAcceleratorAutoplayerConfigurationNormalized;
}
