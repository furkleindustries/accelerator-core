import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStartPassageNameAction,
} from '../actions/IStartPassageNameAction';

export const startPassageNameReducer = (previousState: string = '', action: IStartPassageNameAction) => {
  if (action.type === ActionTypes.StartPassageName && action.value && typeof action.value === 'string') {
    return action.value;
  }

  return previousState;
};
