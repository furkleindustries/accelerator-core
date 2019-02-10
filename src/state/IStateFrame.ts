import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  Tag,
} from '../tags/Tag';

export interface IStateFrame {
  readonly bookmarkCounter: number;
  readonly lastLinkTags: Tag[];
  readonly midrenderSignalCounter: number;
  readonly passageName: string;
  readonly passageTimeCounter: number;
  readonly storyState: IStoryStateFrame;
}
