import {
  IHistory,
} from '../../state/IHistory';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerStateProps {
  passageObject: IPassage;
  storyState: IStoryStateFrame;
  lastLinkTags: Tag[];
  history: IHistory;
}
