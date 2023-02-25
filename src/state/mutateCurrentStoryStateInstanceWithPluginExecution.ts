import {
  createStoryStateAction,
} from '../actions/creators/createStoryStateAction';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  IMutateStoryStateWithPluginArgs,
} from './IMutateStoryStateWithPluginsArgs';

export const strings = {
  PASSAGE_NOT_FOUND:
    'The currentPassageName property of the present state frame does not ' +
    'correspond to any passage in the passages map.',
};

/* Do NOT call this from within a plugin -- there is a high chance you'll
 * cause an infinite loop, then a stack overflow. */
export const mutateCurrentStoryStateInstanceWithPluginExecution = ({
  autoplayerState,
  dispatch,
  getSoundManager,
  history: {
    past,
    present: {
      lastLinkTags,
      storyState: preupdateStoryState,
    },
  },

  passageObject: passage,
  plugins,
  updatedStateProps,
}: IMutateStoryStateWithPluginArgs): void => {
  const config = getNormalizedAcceleratorConfig();
       
  const action = createStoryStateAction(
    updatedStateProps,
    past[past.length - 1]?.passageName || '',
  );

  dispatch(action);

  const passageObject = passage;
  const storyState = {
    ...preupdateStoryState,
    ...updatedStateProps,
  };

  plugins.forEach(({ afterStoryStateChange }) => {
    if (typeof afterStoryStateChange === 'function') {
      afterStoryStateChange({
        autoplayerState,
        config,
        getSoundManager,
        lastLinkTags,
        passageObject,
        storyState,
        updatedStateProps,
      });
    }
  });
};
