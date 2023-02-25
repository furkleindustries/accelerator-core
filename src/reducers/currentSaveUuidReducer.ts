import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryStateLoadAction,
} from '../actions/IStoryStateLoadAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryStateSaveAction,
} from '../actions/IStoryStateSaveAction';
import {
  IStoryStateSaveDeleteAction,
} from '../actions/IStoryStateSaveDeleteAction';

export const currentSaveUuidReducer = (
  previousState = 'Autosave',
  action: IStoryResetAction |
    IStoryStateLoadAction |
    IStoryStateSaveAction |
    IStoryStateSaveDeleteAction,
) => {
  if (action.type === ActionTypes.StoryReset ||
    (action.type === ActionTypes.StoryStateSaveDelete &&
      action.value.uuid === previousState))
  {
    return 'Autosave';
  } else if (action.type === ActionTypes.StoryStateLoad ||
      action.type === ActionTypes.StoryStateSave)
  {
    return action.value.uuid;
  }

  return previousState;
};
