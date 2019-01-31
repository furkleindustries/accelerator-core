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
import {
  ActionCreators,
} from 'redux-undo';

export function reset(args: IPluginMethodBaseArgs & { dispatch: Dispatch<IAction> })
{
  const {
    currentPassageObject,
    dispatch,
    lastLinkTags,
    storyState,
  } = args;

  getPluginsList().forEach(({ beforeRestart }) => {
    if (typeof beforeRestart === 'function') {
      beforeRestart({
        currentPassageObject,
        lastLinkTags,
        storyState,
      });
    }
  });

  dispatch(ActionCreators.clearHistory());
  dispatch(createStoryResetAction());
}
