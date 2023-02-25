import {
  ActionTypes,
} from './ActionTypes';
import {
  IStorySerialization,
} from '../state/IStorySerialization';

export interface IStoryStateLoadAction {
  readonly type: ActionTypes.StoryStateLoad;
  readonly value: IStorySerialization;
}
