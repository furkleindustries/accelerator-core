import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStartPassageNameAction,
} from '../actions/IStartPassageNameAction';
import {
  Reducer,
} from 'redux';

export const startPassageNameReducer: Reducer = (previousState: string = '', action: IStartPassageNameAction) => {
  if (action.type === ActionTypes.StartPassageName && action.value && typeof action.value === 'string') {
    return action.value;
  }

  return previousState;
};

export default startPassageNameReducer;
