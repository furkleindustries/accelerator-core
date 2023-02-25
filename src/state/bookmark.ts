import {
  createBookmarkAction,
} from '../actions/creators/createBookmarkAction';
import {
  IBookmarkAction,
} from '../actions/IBookmarkAction';
import type {
  Dispatch,
} from 'redux';

export const bookmark = (dispatch: Dispatch<IBookmarkAction>) => (
  dispatch(createBookmarkAction())
);
