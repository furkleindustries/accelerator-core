import {
  IStateFrame,
} from './IStateFrame';
import {
  assert,
} from 'ts-assertions';

export function getUnfilteredRewindIndex(
  past: IStateFrame[],
  present: IStateFrame,
): number {
  assert(present);
  assert(Array.isArray(past));

  let index = -1;
  let lastSeen = present;
  for (let ii = past.length - 1; ii >= 0; ii -= 1) {
    const frame = past[ii];
    if (lastSeen.midrenderSignalCounter === frame.midrenderSignalCounter) {
      index = ii;
      break;
    }

    lastSeen = frame;
  }

  return index;
}
