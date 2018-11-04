import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerStateProps {
  currentPassageObject: IPassage;
  currentStoryState: IStoryStateInstance;
  lastLinkTags: Tag[];
}
