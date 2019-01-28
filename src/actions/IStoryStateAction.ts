import {
  ActionTypes,
} from './ActionTypes';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

export interface IStoryStateAction {
  readonly type: ActionTypes.StoryState;
  readonly value: Partial<IStoryStateInstance>;
}
