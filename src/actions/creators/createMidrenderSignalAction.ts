import {
  ActionTypes,
} from '../ActionTypes';
import {
  IMidrenderSignalAction,
} from '../IMidrenderSignalAction';

export function createMidrenderSignalAction(): IMidrenderSignalAction {
  return Object.freeze({
    type: ActionTypes.MidrenderSignal,
  }) as IMidrenderSignalAction;
}