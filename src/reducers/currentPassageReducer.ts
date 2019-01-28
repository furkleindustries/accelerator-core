import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getPassagesMap,
} from '../passages/getPassagesMap';
import {
  IPassage,
} from '../passages/IPassage';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';

const { startPassage } = getPassagesMap();

export function currentPassageReducer(
  previousState: IPassage | null = null,
  action: IPassageNavigationAction | IStoryResetAction,
): IPassage | null
{
  if (action.type === ActionTypes.PassageNavigation) {
    return action.value.passage;
  } else if (action.type === ActionTypes.StoryReset) {
    return startPassage;
  }

  return previousState;
}
