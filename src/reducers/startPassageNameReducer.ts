import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IStartPassageNameAction,
} from '../actions/IStartPassageNameAction';

export function startPassageNameReducer(
  previousState: string | null = null,
  action: IStartPassageNameAction,
)
{
  if (action.type === ActionTypes.StartPassageName &&
      action.value &&
      typeof action.value === 'string')
  {
    return action.value;
  }

  return previousState;
}
