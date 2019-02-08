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
  readonly lastLinkTags: Tag[];
  readonly history: IHistory;
  readonly passageObject: IPassage;
  readonly storyState: IStoryStateFrame;
}
