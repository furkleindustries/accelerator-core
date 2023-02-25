import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  IStoryStateSaveAction,
} from '../IStoryStateSaveAction';

export const createStoryStateSaveAction = (
  value: IStorySerializationPointer,
): IStoryStateSaveAction => Object.freeze({
  type: ActionTypes.StoryStateSave,
  value,
});
