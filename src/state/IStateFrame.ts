import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  Tag,
} from '../tags/Tag';

export interface IStateFrame {
  readonly bookmarkCounter: number;
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageName: string;
  readonly passageTimeCounter: number;
  readonly storyState: IStoryStateFrame;
}
