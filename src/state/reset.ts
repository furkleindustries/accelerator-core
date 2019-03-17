import {
  createStoryResetAction,
} from '../actions/creators/createStoryResetAction';
import {
  IAction,
} from '../actions/IAction';
import {
  IPlugin,
} from '../plugins/IPlugin';
import {
  IPluginMethodBaseArgs,
} from '../plugins/IPluginMethodArgs';
import {
  Dispatch,
} from 'redux';
import {
  ActionCreators,
} from 'redux-undo';

export function reset(args: IPluginMethodBaseArgs & {
  readonly dispatch: Dispatch<IAction>,
  readonly plugins: ReadonlyArray<IPlugin>,
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
