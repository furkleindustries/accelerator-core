import {
  createStoryStateAction,
} from '../actions/creators/createStoryStateAction';
import {
  getPassagesMapAndStartPassage,
} from '../passages/getPassagesMapAndStartPassage';
import {
  getPluginsList,
} from '../plugins/getPluginsList';
import {
  IAction,
} from '../actions/IAction';
import {
  IHistory,
} from './IHistory';
import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  Dispatch,
} from 'redux';

import passagesManifest from '../../passages/passages-manifest';
import pluginsManifest from '../../plugins/plugins-manifest';

const { passagesMap } = getPassagesMapAndStartPassage(passagesManifest);
const pluginsList = getPluginsList(pluginsManifest);

/* Do NOT call this from within a plugin -- there is a very high chance you'll
 * cause an infinite loop, then a stack overflow. */
export function mutateCurrentStoryStateInstanceWithPluginExecution({
  dispatch,
  history,
  updatedStateProps,
}: {
  dispatch: Dispatch<IAction>,
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
      storyState: preupdateStoryState,
    },
  } = history;

  const storyState = {
    ...preupdateStoryState,
    ...updatedStateProps,
  };

  const { [currentPassageName]: currentPassageObject } = passagesMap;

  pluginsList.forEach(({ afterStoryStateChange }) => {
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
