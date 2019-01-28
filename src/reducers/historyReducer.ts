import {
  currentPassageReducer,
} from './currentPassageReducer';
import {
  lastLinkTagsReducer,
} from './lastLinkTagsReducer';
import {
  storyStateReducer,
} from './storyStateHistoryReducer';
import {
  combineReducers,
} from 'redux';

export const historyReducer = combineReducers({
  lastLinkTags: lastLinkTagsReducer,
  passage: currentPassageReducer,
  storyState: storyStateReducer,
});
