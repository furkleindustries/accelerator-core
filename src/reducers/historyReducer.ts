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
  storyStateReducer,
} from './storyStateHistoryReducer';
import {
  combineReducers,
  Reducer,
} from 'redux';
import {
  ActionTypes,
} from '../actions/ActionTypes';
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

const {
  history_save_types,
  history_stack_limit: limit,
} = getAcceleratorEnvVariables();

const actionsToInclude = history_save_types === 'all' ?
  [
    ActionTypes.Bookmark,
    ActionTypes.PassageNavigation,
    ActionTypes.StoryState,      
  ] :
  history_save_types;

export const historyReducer = undoable(
  combineReducers({
    currentPassageName: currentPassageNameReducer,
    lastLinkTags: lastLinkTagsReducer,
    storyState: storyStateReducer,
  }),
  {
    limit,
    filter: includeAction(actionsToInclude),
  },
) as Reducer<IHistory, IAction>;
