import {
  ActionTypes,
} from './ActionTypes';

export interface IStoryRewindAction {
  readonly type: ActionTypes.StoryRewind;
  readonly value: number;
}

export default IStoryRewindAction;
