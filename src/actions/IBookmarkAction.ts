import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IBookmarkAction extends IAction {
  type: ActionTypes.Bookmark;
}
