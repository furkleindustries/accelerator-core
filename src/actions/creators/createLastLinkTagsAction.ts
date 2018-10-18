import {
  ActionTypes,
} from '../ActionTypes';
import {
  ILastLinkTagsAction,
} from '../ILastLinkTagsAction';
import {
  Tag,
} from '../../tags/Tag';

export const createLastLinkTagsAction = (tags: Tag[]): ILastLinkTagsAction => ({
  type: ActionTypes.LastLinkTags,
  value: tags,
});

export default createLastLinkTagsAction;
