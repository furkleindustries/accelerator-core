import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IMidrenderSignalAction,
} from '../actions/IMidrenderSignalAction';


export function midrenderSignalCounterReducer(
  previousState: number = 0,
  action: IMidrenderSignalAction,
)
{
  if (action.type === ActionTypes.MidrenderSignal) {
    return previousState + 1;
  }

  return previousState;
}
