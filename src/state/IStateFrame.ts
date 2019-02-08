import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  Tag,
} from '../tags/Tag';

export interface IStateFrame {
  readonly bookmarkCounter: number;
  readonly currentPassageName: string;
  readonly lastLinkTags: Tag[];
  readonly midrenderSignalCounter: number;
  readonly passageTimeCounter: number;
  readonly storyState: IStoryStateFrame;
}
