import {
  createStoryRewindAction,
} from '../actions/creators/createStoryRewindAction';
import {
  IStoryRewindAction,
} from '../actions/IStoryRewindAction';
import {
  Dispatch,
} from 'redux';

export const rewind = (dispatch: Dispatch<IStoryRewindAction>, num: number = 1): IStoryRewindAction => (
  dispatch(createStoryRewindAction(num))
);
