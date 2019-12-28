import {
  createStoryStateAction,
} from '../actions/creators/createStoryStateAction';
import {
  IAction,
} from '../actions/IAction';
import {
  IHistory,
} from './IHistory';
import {
  IPassage,
} from '../passages/IPassage';
import {
  IPlugin,
} from '../plugins/IPlugin';
import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  Dispatch,
} from 'redux';

export const strings = {
  PASSAGE_NOT_FOUND:
    'The currentPassageName property of the present state frame does not ' +
    'correspond to any passage in the passages map.',
};

/* Do NOT call this from within a plugin -- there is a high chance you'll
 * cause an infinite loop, then a stack overflow. */
export function mutateCurrentStoryStateInstanceWithPluginExecution({
  dispatch,
  history: {
    present: {
      lastLinkTags,
      storyState: preupdateStoryState,
    },
  },

  passageObject,
  plugins,
  updatedStateProps,
}: {
  readonly dispatch: Dispatch<IAction>,
  readonly history: IHistory,
  readonly passageObject: IPassage,
  readonly plugins: ReadonlyArray<IPlugin>,
  readonly updatedStateProps: Partial<IStoryStateFrame>,
}): void
{
  const action = createStoryStateAction(updatedStateProps);
  dispatch(action);

  const storyState = {
    ...preupdateStoryState,
    ...updatedStateProps,
  };

  plugins.forEach(({ afterStoryStateChange }) => {
    if (typeof afterStoryStateChange === 'function') {
      afterStoryStateChange({
        passageObject,
        lastLinkTags,
        storyState,
        updatedStateProps,
      });
    }
  });
};
