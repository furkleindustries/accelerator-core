import {
  ActionTypes,
} from '../ActionTypes';
import {
  IBookmarkAction,
} from '../IBookmarkAction';

export function createBookmarkAction() {
  return Object.freeze({ type: ActionTypes.Bookmark }) as IBookmarkAction;
}
