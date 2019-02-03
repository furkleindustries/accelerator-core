import {
  bookmarkCounterReducer,
} from './bookmarkCounterReducer';
import {
  currentPassageNameReducer,
} from './currentPassageNameReducer';
import {
  IAction,
} from '../actions/IAction';
import {
  lastLinkTagsReducer,
} from './lastLinkTagsReducer';
import {
  midrenderSignalCounterReducer,
} from './midrenderSignalCounterReducer';
import {
  passageTimeReducer,
} from './passageTimeReducer';
import {
  storyStateReducer,
} from './storyStateHistoryReducer';
import {
  combineReducers,
  Reducer,
} from 'redux';
import {
  getAcceleratorConfig,
} from '../configuration/getAcceleratorConfig';
import {
  IHistory,
} from '../state/IHistory';
import {
  default as undoable,
  includeAction,
} from 'redux-undo';

const {
  historySaveTypes,
  historyStackLimit: limit,
  historySynchronizeUnrewindableStateWithPresent: syncFilter,
} = getAcceleratorConfig();

export const historyReducer = undoable(
  combineReducers({
    bookmarkCounter: bookmarkCounterReducer,
    currentPassageName: currentPassageNameReducer,
    lastLinkTags: lastLinkTagsReducer,
    midrenderSignalCounter: midrenderSignalCounterReducer,
    passageTime: passageTimeReducer,
    storyState: storyStateReducer,
  }),
  {
    limit,
    syncFilter,
    filter: includeAction(historySaveTypes),
  },
) as Reducer<IHistory, IAction>;
