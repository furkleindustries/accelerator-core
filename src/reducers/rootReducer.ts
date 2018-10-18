import {
  currentPassageNameReducer,
} from './currentPassageNameReducer';
import {
  lastLinkTagsReducer,
} from './lastLinkTagsReducer';
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
  storyStateReducer,
} from './storyStateReducer';

export const rootReducer = combineReducers({
  passages: passagesReducer,
  currentPassageName: currentPassageNameReducer,
  startPassageName: startPassageNameReducer,
  lastLinkTags: lastLinkTagsReducer,
  storyState: storyStateReducer,
});

export default rootReducer;
