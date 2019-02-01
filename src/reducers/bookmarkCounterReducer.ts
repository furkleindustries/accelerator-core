import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IBookmarkAction,
} from '../actions/IBookmarkAction';


export function bookmarkCounterReducer(
  previousState: number = 0,
  action: IBookmarkAction,
)
{
  if (action.type === ActionTypes.Bookmark) {
    return previousState + 1;
  }

  return previousState;
}
