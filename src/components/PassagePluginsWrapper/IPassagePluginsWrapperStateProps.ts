import {
  IPassage,
} from '../../passages/IPassage';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassagePluginsWrapperStateProps {
  readonly currentPassageObject: IPassage;
  readonly lastLinkTags: Tag[];
}
