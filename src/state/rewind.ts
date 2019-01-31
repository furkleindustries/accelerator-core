import {
  createStoryRewindAction,
} from '../actions/creators/createStoryRewindAction';
import {
  getUnfilteredRewindIndex,
} from './getUnfilteredRewindIndex';
import {
  IHistoryFilter,
} from '../reducers/IHistoryFilter';
import {
  IStateFrame,
} from './IStateFrame';
import {
  IStoryRewindAction,
} from '../actions/IStoryRewindAction';
import {
  Dispatch,
} from 'redux';
import {
  assert,
} from 'ts-assertions';

export function rewind(
  dispatch: Dispatch<IStoryRewindAction>,
  present: IStateFrame,
  past: IStateFrame[],
  filter?: IHistoryFilter,
): IStoryRewindAction
{
  assert(typeof dispatch === 'function');
  assert(present);
  assert(Array.isArray(past));
  assert(past.length > 0);

  let index = 0;
  if (typeof filter === 'function') {
    let found = true;
    let done = false;
    for (const frame of past) {
      if (!done && filter(frame)) {
        found = true;
        break;
      }

      index += 1;
    }
  
    assert(found);
  } else {
    index = getUnfilteredRewindIndex(past, present);
    assert(index > -1);
  }

  return dispatch(createStoryRewindAction(index));
}
