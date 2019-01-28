import {
  createStoryRewindAction,
} from '../actions/creators/createStoryRewindAction';
import {
  IStoryRewindAction,
} from '../actions/IStoryRewindAction';
import {
  Dispatch,
} from 'redux';

export function rewind(
  dispatch: Dispatch<IStoryRewindAction>,
  index?: number,
): IStoryRewindAction
{
  return dispatch(createStoryRewindAction(index));
}
