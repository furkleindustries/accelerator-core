import {
  createCurrentPassageNameAction,
} from '../actions/creators/createCurrentPassageNameAction';
import {
  createStoryResetAction,
} from '../actions/creators/createStoryResetAction';
import {
  getPassagesMap,
} from '../passages/getPassagesMap';
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

export const reset = (args: IPluginMethodBaseArgs & { dispatch: Dispatch<IAction>, }) => {
  const {
    currentPassageObject,
    currentStoryState,
    dispatch,
    lastLinkTags,
  } = args;

  const {
    startPassage: {
      name: startPassageName,
    },
  } = getPassagesMap();

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
