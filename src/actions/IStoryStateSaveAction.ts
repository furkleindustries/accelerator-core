import {
  ActionTypes,
} from './ActionTypes';
import {
  IStorySerializationPointer,
} from '../state/IStorySerializationPointer';

export interface IStoryStateSaveAction {
  readonly type: ActionTypes.StoryStateSave;
  readonly value: IStorySerializationPointer;
}
