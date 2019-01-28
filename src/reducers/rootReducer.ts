import {
  historyReducer,
} from './historyReducer';
import {
  IAction,
} from '../actions/IAction';
import {
  IState,
} from '../state/IState';
import {
  combineReducers,
  Reducer,
} from 'redux';
import {
  storyRequiresFullRerenderReducer,
} from './storyRequiresFullRerenderReducer';

export const rootReducer: Reducer<IState, IAction> = combineReducers({
  history: historyReducer,
  storyRequiresFullRerender: storyRequiresFullRerenderReducer,
});
