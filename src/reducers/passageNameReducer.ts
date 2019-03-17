import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getPassagesMapAndStartPassageName,
} from '../passages/getPassagesMapAndStartPassageName';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  assert,
} from 'ts-assertions';

export const strings = {
  NO_START_PASSAGE_NAME:
    'There was no start passage name when currentPassageNameReducer was'
};

const { startPassageName } = getPassagesMapAndStartPassageName();
assert(startPassageName, strings.NO_START_PASSAGE_NAME);

export function passageNameReducer(
  previousState: string = startPassageName,
  action: IPassageNavigationAction | IStoryResetAction,
): string
{
  if (action.type === ActionTypes.PassageNavigation) {
    return action.value.passage.name;
  } else if (action.type === ActionTypes.StoryReset) {
    return startPassageName;
  }

  return previousState;
}
