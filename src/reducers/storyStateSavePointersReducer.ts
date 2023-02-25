import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStoryStateSaveAction,
} from '../actions/IStoryStateSaveAction';
import {
  IStoryStateSaveDeleteAction,
} from '../actions/IStoryStateSaveDeleteAction';
import {
  IStoryStateSaveRegistryInitAction,
} from '../actions/IStoryStateSaveRegistryInitAction';
import {
  IStoryStateSavePointerMap,
} from '../state/IStoryStateSavePointerMap';

export const storyStateSavePointersReducer = (
  previousValue: IStoryStateSavePointerMap = {},
  action: IStoryStateSaveAction |
    IStoryStateSaveDeleteAction |
    IStoryStateSaveRegistryInitAction,
): IStoryStateSavePointerMap => {
  if (action.type === ActionTypes.StoryStateSave) {
    return {
      ...previousValue,
      [action.value.saveName]: action.value,
    };
  } else if (action.type === ActionTypes.StoryStateSaveDelete) {
    const newVal = { ...previousValue };
    delete newVal[action.value.saveName];
    return newVal;
  } else if (action.type === ActionTypes.StoryStateSaveRegistryInit) {
    return { ...action.value };
  }

  return previousValue;
};
