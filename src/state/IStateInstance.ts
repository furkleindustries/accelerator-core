import {
  IPassage,
} from '../passages/IPassage';
import {
  IStoryStateInstance,
} from './IStoryStateInstance';
import {
  Tag,
} from '../tags/Tag';

export interface IStateInstance {
  lastLinkTags: Tag[];
  passage: IPassage;
  startPassageName: string;
  storyRequiresFullRerender: boolean;
  storyState: IStoryStateInstance;
}
