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
  console.log('present: ', present);
  console.log('past: ', past);

  let index = -1;
  let lastSeen = present;
  for (const frame of past) {
    if (lastSeen.midrenderSignalCounter === frame.midrenderSignalCounter) {
      break;
    }

    lastSeen = frame;
    index += 1;
  }

  console.log(index);
  return index;
}
