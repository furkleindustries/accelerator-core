import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  IAutoplayerStateUpdateAction,
} from '../actions/IAutoplayerStateUpdateAction';

const {
  autoplayer: autoplayerConfig,
} = getNormalizedAcceleratorConfig();

export const autoplayerStateReducer = (
  previousState = autoplayerConfig,
  action: IAutoplayerStateUpdateAction,
) => {
  if (action.type === ActionTypes.AutoplayerStateUpdate) {
    return action.value;
  }

  return previousState;
};
