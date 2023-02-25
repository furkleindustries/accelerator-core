import { IAcceleratorAutoplayerConfigurationNormalized } from '../../configuration/IAcceleratorAutoplayerConfigurationNormalized';
import {
  ActionTypes,
} from '../ActionTypes';
import {
  IAutoplayerStateUpdateAction,
} from '../IAutoplayerStateUpdateAction';

export const createAutoplayerStateUpdateAction = (
  value: IAcceleratorAutoplayerConfigurationNormalized,
): IAutoplayerStateUpdateAction => Object.freeze({
  type: ActionTypes.AutoplayerStateUpdate,
  value,
});
