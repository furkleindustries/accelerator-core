import {
  createStoryResetAction,
} from '../actions/creators/createStoryResetAction';
import {
  IPlugin,
} from '../plugins/IPlugin';
import {
  IPluginMethodBaseArgs,
} from '../plugins/IPluginMethodArgs';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  Dispatch,
} from 'redux';
import {
  ActionCreators,
} from 'redux-undo';

export const reset = (args: IPluginMethodBaseArgs & {
  readonly dispatch: Dispatch<IStoryResetAction>;
  readonly plugins: readonly IPlugin[];
}) => {
  const {
    dispatch,
    lastLinkTags,
    passageObject,
    plugins,
    storyState,
  } = args;

  plugins.forEach(({ beforeRestart }) => {
    if (typeof beforeRestart === 'function') {
      beforeRestart({
        lastLinkTags,
        passageObject,
        storyState,
      });
    }
  });

  dispatch(ActionCreators.clearHistory());
  dispatch(createStoryResetAction());
};
