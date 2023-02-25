import {
  ActionTypes,
} from '../ActionTypes';
import {
  ISoundsLoadedAction,
} from '../ISoundsLoadedAction';

export const createSoundsLoadedAction = (
  value: boolean,
): ISoundsLoadedAction => (
  Object.freeze({
    type: ActionTypes.SoundsLoaded,
    value,
  })
);
