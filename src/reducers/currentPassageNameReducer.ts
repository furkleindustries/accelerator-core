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
  startPassage,
} = getPassagesMap();

export function currentPassageNameReducer(
  previousState: string = startPassage.name,
  action: ICurrentPassageNameAction | IStoryResetAction,
)
{
  if (action.type === ActionTypes.CurrentPassageName) {
    return action.value;
  } else if (action.type === ActionTypes.StoryReset) {
    return startPassage.name;
  }

  return previousState;
};
