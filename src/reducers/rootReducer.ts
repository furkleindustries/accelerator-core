import {
  autoplayerStateReducer,
} from './autoplayerStateReducer';
import {
  currentSaveUuidReducer,
} from './currentSaveUuidReducer';
import {
  debugReducer,
} from './debugReducer';
import {
  historyReducer,
} from './historyReducer';
import {
  IAction,
} from '../actions/IAction';
import {
  IState,
} from '../state/IState';
import {
  passageReadyReducer,
} from './passageReadyReducer';
import {
  combineReducers,
  Reducer,
} from 'redux';
import {
  soundsLoadedReducer,
} from './soundsLoadedReducer';
import {
  storyLoadedReducer,
} from './storyLoadedReducer';
import {
  soundManagerStateReducer,
} from './soundManagerStateReducer';
import {
  storyOptionsDialogVisibleReducer,
} from './storyOptionsDialogVisibleReducer';
import {
  storyRequiresFullRerenderReducer,
} from './storyRequiresFullRerenderReducer';
import {
  storyStateSavePointersReducer,
} from './storyStateSavePointersReducer';

export const rootReducer: Reducer<IState, IAction> = combineReducers({
  autoplayerState: autoplayerStateReducer,
  debug: debugReducer,
  currentSaveUuid: currentSaveUuidReducer,
  history: historyReducer,
  passageReady: passageReadyReducer,
  soundManagerState: soundManagerStateReducer,
  soundsLoaded: soundsLoadedReducer,
  storyLoaded: storyLoadedReducer,
  storyOptionsDialogVisible: storyOptionsDialogVisibleReducer,
  storyRequiresFullRerender: storyRequiresFullRerenderReducer,
  storyStateSavePointers: storyStateSavePointersReducer,
});
