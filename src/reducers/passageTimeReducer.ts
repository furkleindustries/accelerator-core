import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IPassageTimeAction,
} from '../actions/IPassageTimeAction';

/* This mostly exists to ensure that traveling to a passage from itself is
 * always treated as a new, distinct state. */
export function passageTimeReducer(
  previousState: number = 0,
  action: IPassageNavigationAction | IPassageTimeAction,
)
{
  if (action.type === ActionTypes.PassageNavigation ||
      action.type === ActionTypes.PassageTime)
  {
    return previousState + 1;
  }

  return previousState;
}
