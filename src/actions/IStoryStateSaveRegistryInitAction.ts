import {
  ActionTypes,
} from './ActionTypes';
import {
  IStoryStateSavePointerMap,
} from '../state/IStoryStateSavePointerMap';

export interface IStoryStateSaveRegistryInitAction {
  readonly type: ActionTypes.StoryStateSaveRegistryInit;
  readonly value: IStoryStateSavePointerMap;
}
