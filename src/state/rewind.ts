import {
  createStoryRewindAction,
} from '../actions/creators/createStoryRewindAction';
import {
  getUnfilteredRewindIndex,
} from './getUnfilteredRewindIndex';
import {
  HistoryFilter,
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
  past: ReadonlyArray<IStateFrame>,
  filter?: HistoryFilter,
): IStoryRewindAction
{
  assert(typeof dispatch === 'function');
  assert(present);
  assert(Array.isArray(past));
  assert(past.length > 0);

  let index = 0;
  if (typeof filter === 'function') {
    let found = true;
    for (let ii = past.length - 1; ii >= 0; ii -= 1) {
      const frame = past[ii];
      if (filter(frame)) {
        found = true;
        index = ii;
        break;
      }
    }
  
    assert(found);
  } else {
    index = getUnfilteredRewindIndex(past, present);
    assert(index > -1);
  }

  return dispatch(createStoryRewindAction(index));
}
