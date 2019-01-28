import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  ICurrentPassageAction,
} from '../actions/ICurrentPassageAction';
import {
  IPassage,
} from '../passages/IPassage';

export function currentPassageReducer(
  previousState: IPassage | null = null,
  action: ICurrentPassageAction,
)
{
  if (action.type === ActionTypes.CurrentPassage) {
    return action.value;
  }

  return previousState;
};
