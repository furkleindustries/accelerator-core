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
  getAcceleratorEnvVariables,
} from '../configuration/getAcceleratorEnvVariables';
import {
  IHistory,
} from '../state/IHistory';
import {
  default as undoable,
  includeAction,
} from 'redux-undo';
import {
  assert,
} from 'ts-assertions';

const {
  history_save_types,
  history_stack_limit: limit,
} = getAcceleratorEnvVariables();

assert(
  history_save_types,
);

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
    filter: includeAction(history_save_types),
  },
) as Reducer<IHistory, IAction>;
