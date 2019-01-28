import {
  ActionTypes,
} from '../ActionTypes';
import {
  ILastLinkTagsAction,
} from '../ILastLinkTagsAction';
import {
  Tag,
} from '../../tags/Tag';

export function createLastLinkTagsAction(value: Tag[]): ILastLinkTagsAction {
  return Object.freeze({
    type: ActionTypes.LastLinkTags,
    value,
  }) as ILastLinkTagsAction;
}
