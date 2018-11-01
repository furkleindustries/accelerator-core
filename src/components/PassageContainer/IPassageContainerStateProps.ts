import {
  IPassage,
} from '../../passages/IPassage';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContainerStateProps {
  currentPassage: IPassage;
  currentStoryState: IStoryStateInstance;
  lastLinkTags: Tag[];
  startPassageName: string;
}

export default IPassageContainerStateProps;
