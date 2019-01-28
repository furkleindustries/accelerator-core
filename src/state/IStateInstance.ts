import {
  IStoryStateInstance,
} from './IStoryStateInstance';
import {
  Tag,
} from '../tags/Tag';

export interface IStateInstance {
  currentPassageName: string;
  lastLinkTags: Tag[];
  storyState: IStoryStateInstance;
}
