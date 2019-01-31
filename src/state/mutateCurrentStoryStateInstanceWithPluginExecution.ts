import {
  createStoryStateAction,
} from '../actions/creators/createStoryStateAction';
import {
  getPassagesMap,
} from '../passages/getPassagesMap';
import {
  getPluginsList,
} from '../plugins/getPluginsList';
import {
  IHistory,
} from './IHistory';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  Dispatch,
} from 'redux';

/* Do NOT call this from within a plugin -- there is a very high chance you'll
 * cause an infinite loop, then a stack overflow. */
export function mutateCurrentStoryStateInstanceWithPluginExecution({
  dispatch,
  history,
  updatedStateProps,
}: {
  dispatch: Dispatch<IStoryStateAction>,
  history: IHistory,
  updatedStateProps: Partial<IStoryStateFrame>,
}): void
{
  const action = createStoryStateAction(updatedStateProps);
  dispatch(action);

  const {
    present: {
      currentPassageName,
      lastLinkTags,
      storyState,
    },
  } = history;

  const {
    passagesMap: { [currentPassageName]: currentPassageObject },
  } = getPassagesMap();

  getPluginsList().forEach(({ afterStoryStateChange }) => {
    if (typeof afterStoryStateChange === 'function') {
      afterStoryStateChange({
        currentPassageObject,
        lastLinkTags,
        storyState,
        updatedStateProps,
      });
    }
  });
};
