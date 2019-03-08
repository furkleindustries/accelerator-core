export { ActionTypes } from '../actions/ActionTypes';

import { createBookmarkAction } from '../actions/creators/createBookmarkAction';
import { createMidrenderSignalAction } from '../actions/creators/createMidrenderSignalAction';
import { createPassageNavigationAction } from '../actions/creators/createPassageNavigationAction';
import { createPassageTimeAction } from '../actions/creators/createPassageTimeAction';
import { createStoryOptionUpdateAction } from '../actions/creators/createStoryOptionUpdateAction';
import { createStoryRequiresFullRerenderAction } from '../actions/creators/createStoryRequiresFullRerenderAction';
import { createStoryResetAction } from '../actions/creators/createStoryResetAction';
import { createStoryRewindAction } from '../actions/creators/createStoryRewindAction';
import { createStoryStateAction } from '../actions/creators/createStoryStateAction';

export const actionCreators = {
  bookmark: createBookmarkAction,
  midrenderSignal: createMidrenderSignalAction,
  passageNavigation: createPassageNavigationAction,
  passageTime: createPassageTimeAction,
  storyOptionUpdate: createStoryOptionUpdateAction,
  storyRequiresFullRerender: createStoryRequiresFullRerenderAction,
  storyReset: createStoryResetAction,
  storyRewind: createStoryRewindAction,
  storyState: createStoryStateAction,
};
