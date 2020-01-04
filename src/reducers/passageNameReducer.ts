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

import {
  registry,
} from '../../passages/passages-manifest';

type RegistryType = typeof registry;

export const strings = {
  NO_START_PASSAGE_NAME:
    'There was no start passage name when currentPassageNameReducer was'
};

const { startPassageName } = getPassagesMapAndStartPassageName();
assert(startPassageName, strings.NO_START_PASSAGE_NAME);

export const passageNameReducer = (
  previousState: keyof RegistryType = startPassageName,
  action: IPassageNavigationAction | IStoryResetAction,
): keyof RegistryType => {
  if (action.type === ActionTypes.PassageNavigation) {
    return action.value.passage.name;
  } else if (action.type === ActionTypes.StoryReset) {
    return startPassageName;
  }

  return previousState;
};
