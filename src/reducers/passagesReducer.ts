import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IPassagesAction,
} from '../actions/IPassagesAction';
import {
  Reducer,
} from 'redux';
import {
  IPassagesMap,
} from '../passages/IPassagesMap';

export const passagesReducer: Reducer<IPassagesMap, IPassagesAction> = (previousState: IPassagesMap = {}, action: IPassagesAction) => {
  if (action.type === ActionTypes.Passages && action.value && typeof action.value === 'object') {
    return action.value;
  }

  return previousState;
};

export default passagesReducer;