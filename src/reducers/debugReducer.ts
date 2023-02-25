import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  IDebugAction,
} from '../actions/IDebugAction';

const {
  debug,
} = getNormalizedAcceleratorConfig();

export const debugReducer = (
  previousState = debug,
  action: IDebugAction,
) => {
  if (action.type === ActionTypes.Debug) {
    return action.value;
  }

  return previousState;
};
