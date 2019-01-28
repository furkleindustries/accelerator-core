import {
  historyReducer,
} from './historyReducer';
import {
  IAction,
} from '../actions/IAction';
import {
  IHistory,
} from '../state/IHistory';
import {
  IState,
} from '../state/IState';
import {
  combineReducers,
  Reducer,
} from 'redux';
/* No @types/redux-undo for this at the moment. */
// @ts-ignore
import undoable from 'redux-undo';
import {
  storyRequiresFullRerenderReducer,
} from './storyRequiresFullRerenderReducer';

export const rootReducer: Reducer<IState, IAction> = combineReducers({
  history: undoable(historyReducer) as Reducer<IHistory, IAction>,
  storyRequiresFullRerender: storyRequiresFullRerenderReducer,
});
