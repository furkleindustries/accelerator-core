import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassagesMap,
} from 'src/passages/IPassagesMap';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  Tag,
} from 'src/tags/Tag';

export interface IPassageContainerStateProps {
  currentPassage: IPassage;
  currentStoryState: IStoryStateInstance;
  lastLinkTags: Tag[];
  passages: IPassagesMap;
  startPassageName: string;
}

export default IPassageContainerStateProps;
