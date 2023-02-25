import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryStateSaveRegistryInitAction,
} from '../IStoryStateSaveRegistryInitAction';
import {
  IStoryStateSavePointerMap,
} from '../../state/IStoryStateSavePointerMap';

export const createStoryStateSaveRegistryInitAction = (
  value: IStoryStateSavePointerMap,
): IStoryStateSaveRegistryInitAction => Object.freeze({
  value,
  type: ActionTypes.StoryStateSaveRegistryInit,
});
