import {
  ActionTypes,
} from './ActionTypes';
import {
  IStorySerializationPointer,
} from '../state/IStorySerializationPointer';

export interface IStoryStateSaveDeleteAction {
  readonly type: ActionTypes.StoryStateSaveDelete;
  readonly value: IStorySerializationPointer;
}
