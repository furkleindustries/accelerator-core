import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';
import {
  Tag,
} from '../tags/Tag';

export interface ILastLinkTagsAction extends IAction {
  readonly type: ActionTypes.LastLinkTags;
  readonly value: Tag[];
}
