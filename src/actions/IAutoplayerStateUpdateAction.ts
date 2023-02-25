import {
  ActionTypes,
} from './ActionTypes';
import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from '../configuration/IAcceleratorAutoplayerConfigurationNormalized';

export interface IAutoplayerStateUpdateAction {
  readonly type: ActionTypes.AutoplayerStateUpdate;
  readonly value: IAcceleratorAutoplayerConfigurationNormalized;
}
