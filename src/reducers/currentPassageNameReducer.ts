import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getPassagesMapAndStartPassageName,
} from '../passages/getPassagesMapAndStartPassageName';
import {
  ICurrentPassageNameAction,
} from '../actions/ICurrentPassageNameAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';

const { startPassageName } = getPassagesMapAndStartPassageName();

export function currentPassageNameReducer(
  previousState: string = startPassageName,
  action: ICurrentPassageNameAction | IStoryResetAction,
): string
{
  if (action.type === ActionTypes.CurrentPassageName) {
    return action.value;
  } else if (action.type === ActionTypes.StoryReset) {
    return name;
  }

  return previousState;
}
