import {
  createStoryResetAction,
} from '../actions/creators/createStoryResetAction';
import {
  getPluginsList,
} from '../plugins/getPluginsList';
import {
  IAction,
} from '../actions/IAction';
import {
  IPluginMethodBaseArgs,
} from '../passages/pluginsBundle';
import {
  Dispatch,
} from 'redux';

export function reset(args: IPluginMethodBaseArgs & { dispatch: Dispatch<IAction> }) {
  const {
    currentPassageObject,
    storyState: currentStoryState,
    dispatch,
    lastLinkTags,
  } = args;

  getPluginsList().forEach((plugin) => {
    if (typeof plugin.beforeRestart === 'function') {
      plugin.beforeRestart({
        currentPassageObject,
        storyState: currentStoryState,
        lastLinkTags,
      });
    }
  });

  dispatch(createStoryResetAction());
};
