import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  ISoundsLoadedAction,
} from '../actions/ISoundsLoadedAction';

export const soundsLoadedReducer = (
  previousState = false,
  action: ISoundsLoadedAction,
): boolean => {
  if (action.type !== ActionTypes.SoundsLoaded) {
    return previousState;
  }
  
  return action.value;
};
