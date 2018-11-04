import {
  createCurrentPassageNameAction,
} from '../actions/creators/createCurrentPassageNameAction';
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

export const reset = (args: IPluginMethodBaseArgs & { dispatch: Dispatch<IAction>, startPassageName: string, }) => {
  const {
    currentPassageObject,
    currentStoryState,
    dispatch,
    lastLinkTags,
    startPassageName,
  } = args;

  const plugins = getPluginsList();
  plugins.forEach((plugin) => {
    if (typeof plugin.beforeRestart === 'function') {
      plugin.beforeRestart({
        currentPassageObject,
        currentStoryState,
        lastLinkTags,
      });
    }
  });

  dispatch(createStoryResetAction());
  dispatch(createCurrentPassageNameAction(startPassageName));
};
