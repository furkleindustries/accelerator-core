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
  action: ICurrentPassageNameAction | IStoryResetAction,
): string
{
  if (action.type === ActionTypes.CurrentPassageName) {
    return action.value;
  } else if (action.type === ActionTypes.StoryReset) {
    return startPassageName;
  }

  return previousState;
}
