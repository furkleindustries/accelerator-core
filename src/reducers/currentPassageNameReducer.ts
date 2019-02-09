import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getPassagesMapAndStartPassage,
} from '../passages/getPassagesMapAndStartPassage';
import {
  ICurrentPassageNameAction,
} from '../actions/ICurrentPassageNameAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';

import manifest from '../../passages/passages-manifest';

const { startPassage: { name } } = getPassagesMapAndStartPassage(manifest);

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
