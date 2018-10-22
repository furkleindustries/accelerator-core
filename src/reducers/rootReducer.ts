import {
  currentPassageNameReducer,
} from './currentPassageNameReducer';
import {
  passageHistoryReducer,
} from './passageHistoryReducer';
import {
  passagesReducer,
} from './passagesReducer';
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
  passages: passagesReducer,
  currentPassageName: currentPassageNameReducer,
  startPassageName: startPassageNameReducer,
  passageHistory: passageHistoryReducer,
  storyStateHistory: storyStateHistoryReducer,
});

export default rootReducer;
