import {
  ActionTypes,
} from './ActionTypes';

export interface IStoryLoadedAction {
  readonly type: ActionTypes.StoryLoaded;
  readonly value: boolean;
}
