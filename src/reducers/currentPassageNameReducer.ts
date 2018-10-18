import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  ICurrentPassageNameAction,
} from '../actions/ICurrentPassageNameAction';
import {
  Reducer,
} from 'redux';

export const currentPassageNameReducer: Reducer = (previousState: string = '', action: ICurrentPassageNameAction) => {
  if (action.type === ActionTypes.CurrentPassageName && action.value && typeof action.value === 'string') {
    return action.value;
  }

  return previousState;
};

export default currentPassageNameReducer;
