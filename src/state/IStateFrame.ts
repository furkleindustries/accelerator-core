import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  ITag,
} from '../tags/ITag';

export interface IStateFrame {
  readonly bookmarkCounter: number;
  readonly lastLinkTags: ReadonlyArray<ITag>;
  readonly passageName: string;
  readonly passageTimeCounter: number;
  readonly storyState: IStoryStateFrame;
}
