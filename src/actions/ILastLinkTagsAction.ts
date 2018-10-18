import {
  ActionTypes,
} from './ActionTypes';
import {
  Tag,
} from '../tags/Tag';

export interface ILastLinkTagsAction {
  type: ActionTypes.LastLinkTags;
  value: Tag[];
}

export default ILastLinkTagsAction;