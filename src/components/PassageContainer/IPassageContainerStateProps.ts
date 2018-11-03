import {
  IPassage,
} from '../../passages/IPassage';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContainerStateProps {
  currentPassage: IPassage;
  lastLinkTags: Tag[];
  startPassageName: string;
}

export default IPassageContainerStateProps;
