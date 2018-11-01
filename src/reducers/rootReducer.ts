import {
  currentPassageNameReducer,
} from './currentPassageNameReducer';
import {
  passageHistoryReducer,
} from './passageHistoryReducer';
import {
  combineReducers,
} from 'redux';
import {
  startPassageNameReducer,
} from './startPassageNameReducer';
import {
  storyStateHistoryReducer,
} from './storyStateHistoryReducer';

export const rootReducer = combineReducers({
  currentPassageName: currentPassageNameReducer,
  startPassageName: startPassageNameReducer,
  passageHistory: passageHistoryReducer,
  storyStateHistory: storyStateHistoryReducer,
});

export default rootReducer;
