import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  ICurrentPassageNameAction,
} from '../actions/ICurrentPassageNameAction';

export const currentPassageNameReducer = (previousState: string = '', action: ICurrentPassageNameAction) => {
  if (action.type === ActionTypes.CurrentPassageName && action.value && typeof action.value === 'string') {
    return action.value;
  }

  return previousState;
};
