import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  Tag,
} from '../../tags/Tag';

export interface IRestartButtonStateProps {
  currentPassageObject: IPassage;
  currentStoryState: IStoryStateFrame;
  lastLinkTags: Tag[];
}
