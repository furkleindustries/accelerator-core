import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  IStoryStateSaveDeleteAction,
} from '../IStoryStateSaveDeleteAction';

export const createStoryStateSaveDeleteAction = (
  value: IStorySerializationPointer,
): IStoryStateSaveDeleteAction => Object.freeze({
  type: ActionTypes.StoryStateSaveDelete,
  value,
});
