import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  Tag,
} from '../../tags/Tag';

export interface IRestartButtonStateProps {
  currentPassageObject: IPassage;
  currentStoryState: IStoryStateInstance;
  lastLinkTags: Tag[];
}
