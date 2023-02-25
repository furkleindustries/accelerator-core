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
  inkContainersReducer,
} from './inkContainersReducer';
import {
  default as undoable,
  includeAction,
} from 'redux-undo';
import {
  storyEndedReducer,
} from './storyEndedReducer';

const {
  debug: debugRaw,
  debugOptions: { reduxUndoDebug },
  historySaveTypes,
  historyStackLimit: limit,
} = getNormalizedAcceleratorConfig();

const debug = debugRaw && reduxUndoDebug; 
const filter = includeAction([ ...historySaveTypes ]);
const syncFilter = true;

export const historyReducer: Reducer<IHistory, IAction> = undoable(
  combineReducers({
    bookmarkCounter: bookmarkCounterReducer,
    inkContainers: inkContainersReducer,
    lastLinkTags: lastLinkTagsReducer,
    passageName: passageNameReducer,
    passageTimeCounter: passageTimeReducer,
    storyEnded: storyEndedReducer,
    storyState: storyStateReducer,
  }),

  {
    debug,
    filter,
    limit,
    syncFilter,
  },
);
