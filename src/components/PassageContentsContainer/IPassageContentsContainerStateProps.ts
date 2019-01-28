import {
  IHistory,
} from '../../state/IHistory';
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
  passageObject: IPassage;
  storyState: IStoryStateInstance;
  lastLinkTags: Tag[];
  history: IHistory;
}
