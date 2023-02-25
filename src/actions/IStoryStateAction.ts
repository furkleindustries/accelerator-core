import {
  ActionTypes,
} from './ActionTypes';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';

export interface IStoryStateAction {
  readonly type: ActionTypes.StoryState;
  readonly value: Partial<IStoryStateFrame>;
  readonly lastPassageName: string;
}
