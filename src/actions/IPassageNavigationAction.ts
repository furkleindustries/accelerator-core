import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';
import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  IPassage,
} from '../passages/IPassage';

export interface IPassageNavigationAction extends IAction {
  readonly type: ActionTypes.PassageNavigation;
  readonly value: (
    { readonly passage: IPassage } &
      { readonly linkTags: ILastLinkTagsAware['lastLinkTags'] }
  );
}
