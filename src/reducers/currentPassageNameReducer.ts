import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getPassagesMap,
} from '../passages/getPassagesMap';
import {
  ICurrentPassageNameAction,
} from '../actions/ICurrentPassageNameAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';

const {
  startPassage: { name },
} = getPassagesMap();

export function currentPassageNameReducer(
  previousState: string = name,
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
