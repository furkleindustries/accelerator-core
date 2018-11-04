import {
  IPassage,
} from '../../passages/IPassage';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassagePluginsWrapperStateProps {
  currentPassageObject: IPassage;
  lastLinkTags: Tag[];
}

export default IPassagePluginsWrapperStateProps;
