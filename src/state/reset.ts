import {
  createStoryResetAction,
} from '../actions/creators/createStoryResetAction';
import {
  IAction,
} from '../actions/IAction';
import {
  IPlugin,
  IPluginMethodBaseArgs,
} from '../passages/pluginsBundle';
import {
  Dispatch,
} from 'redux';
import {
  ActionCreators,
} from 'redux-undo';

export function reset(args: IPluginMethodBaseArgs & {
  dispatch: Dispatch<IAction>,
  plugins: IPlugin[],
})
{
  const {
    passageObject,
    dispatch,
    lastLinkTags,
    plugins,
    storyState,
  } = args;

  plugins.forEach(({ beforeRestart }) => {
    if (typeof beforeRestart === 'function') {
      beforeRestart({
        passageObject,
        lastLinkTags,
        storyState,
      });
    }
  });

  dispatch(ActionCreators.clearHistory());
  dispatch(createStoryResetAction());
}
