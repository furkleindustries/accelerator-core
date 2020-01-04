import {
  IStoryStateSetter,
} from './IStoryStateSetter';

export interface ISetStoryStateAware {
  readonly setStoryState: IStoryStateSetter;
}
