import {
  bookmarkCounterReducer,
} from './bookmarkCounterReducer';
import {
  passageNameReducer,
} from './passageNameReducer';
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
} from './storyStateReducer';
import {
  combineReducers,
  Reducer,
} from 'redux';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
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
} = getNormalizedAcceleratorConfig();

export const historyReducer: Reducer<IHistory, IAction> = undoable(
  combineReducers({
    bookmarkCounter: bookmarkCounterReducer,
    passageName: passageNameReducer,
    lastLinkTags: lastLinkTagsReducer,
    midrenderSignalCounter: midrenderSignalCounterReducer,
    passageTimeCounter: passageTimeReducer,
    storyState: storyStateReducer,
  }),
  {
    limit,
    syncFilter,
    filter: includeAction(historySaveTypes),
  },
);
