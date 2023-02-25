import {
  ActionTypes,
} from '../actions/ActionTypes';
import initialStoryState from '../../passages/_constants/initialStoryState';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';
import {
  IStoryStateLoadAction,
} from '../actions/IStoryStateLoadAction';

export const storyStateReducer = (
  previousState: IStoryStateFrame = initialStoryState,
  action: IStoryStateAction | IStoryResetAction | IStoryStateLoadAction,
): IStoryStateFrame => {
  if (action.type === ActionTypes.StoryState) {
    return {
      ...previousState,
      ...action.value,
    };
  } else if (action.type === ActionTypes.StoryReset) {
    return { ...initialStoryState };
  } else if (action.type === ActionTypes.StoryStateLoad) {
    return { ...action.value.engineHistory.present.storyState };
  }

  return previousState;
};
