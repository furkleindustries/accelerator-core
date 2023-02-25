import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IBookmarkAction,
} from '../actions/IBookmarkAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryStateLoadAction,
} from '../actions/IStoryStateLoadAction';

export const bookmarkCounterReducer = (
  previousState = 0,
  action: IBookmarkAction | IStoryResetAction | IStoryStateLoadAction,
) => {
  if (action.type === ActionTypes.Bookmark) {
    return previousState + 1;
  } else if (action.type === ActionTypes.StoryReset) {
    return 0;
  } else if (action.type === ActionTypes.StoryStateLoad) {
    return action.value.engineHistory.present.bookmarkCounter;
  }

  return previousState;
};
