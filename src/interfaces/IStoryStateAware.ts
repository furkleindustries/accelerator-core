import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';

export interface IStoryStateAware {
  readonly storyState: IStoryStateFrame;
}
