import {
  currentPassageNameReducer,
} from './currentPassageNameReducer';
import {
  IAction,
} from '../actions/IAction';
import {
  IState,
} from '../state/IState';
import {
  passageHistoryReducer,
} from './passageHistoryReducer';
import {
  combineReducers,
  Reducer,
} from 'redux';
import {
  startPassageNameReducer,
} from './startPassageNameReducer';
import {
  storyStateHistoryReducer,
} from './storyStateHistoryReducer';
import {
  storyRequiresFullRerenderReducer,
} from './storyRequiresFullRerenderReducer';

export const rootReducer: Reducer<IState, IAction> = combineReducers({
  currentPassageName: currentPassageNameReducer,
  startPassageName: startPassageNameReducer,
  passageHistory: passageHistoryReducer,
  storyRequiresFullRerender: storyRequiresFullRerenderReducer,
  storyStateHistory: storyStateHistoryReducer,
});
