import {
  Dispatch,
} from 'redux';
import {
  IBookmarkAction,
} from '../actions/IBookmarkAction';
import { createBookmarkAction } from '../actions/creators/createBookmarkAction';

export function bookmark(dispatch: Dispatch<IBookmarkAction>) {
  return dispatch(createBookmarkAction());
}
