import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  PassageNames,
} from '../passages/IPassagesMap';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryStateLoadAction,
} from '../actions/IStoryStateLoadAction';

export const strings = {
  NO_START_PASSAGE_NAME:
    'There was no start passage name when currentPassageNameReducer was'
};

const { startPassageName } = getNormalizedAcceleratorConfig();

export const passageNameReducer = (
  previousState: PassageNames = startPassageName,
  action: IPassageNavigationAction | IStoryResetAction | IStoryStateLoadAction,
): PassageNames => {
  if (action.type === ActionTypes.PassageNavigation) {
    return action.value.passage.name;
  } else if (action.type === ActionTypes.StoryReset) {
    return startPassageName;
  } else if (action.type === ActionTypes.StoryStateLoad) {
    return action.value.engineHistory.present.passageName;
  }

  return previousState;
};
