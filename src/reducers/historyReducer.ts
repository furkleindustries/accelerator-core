import {
  currentPassageNameReducer,
} from './currentPassageNameReducer';
import {
  currentPassageReducer,
} from './currentPassageReducer';
import {
  IAction,
} from '../actions/IAction';
import {
  IPassage,
} from '../passages/IPassage';
import {
  IStateInstance,
} from '../state/IStateInstance';
import {
  lastLinkTagsReducer,
} from './lastLinkTagsReducer';
import {
  storyStateReducer,
} from './storyStateHistoryReducer';
import {
  combineReducers,
  Reducer,
} from 'redux';

export const historyReducer: Reducer<IStateInstance, IAction> = combineReducers({
  currentPassageName: currentPassageNameReducer,
  lastLinkTags: lastLinkTagsReducer,
  /* In practice the passage can be null but this should only be an ephemeral,
   * internal state which cannot be observed, so we type this as if it were
   * never null. */
  passage: currentPassageReducer as Reducer<IPassage, IAction>,
  storyState: storyStateReducer,
});
