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
  IState,
} from './IState';
import {
  IStoryStateInstance,
} from './IStoryStateInstance';
import {
  Store,
} from 'redux';

/* Do NOT call this from within a plugin -- there is a very high chance you'll
 * cause an infinite loop, then a stack overflow. */
export function mutateCurrentStoryStateInstanceWithPluginExecution(
  updatedStateProps: Partial<IStoryStateInstance>,
  store: Store<IState>,
)
{
  const action = createStoryStateAction(updatedStateProps);
  store.dispatch(action);

  const state = store.getState();
  const {
    history: {
      present: {
        currentPassageName: name,
        lastLinkTags,
        storyState,
      },
    },
  } = state;

  const plugins = getPluginsList();
  plugins.forEach((plugin) => {
    if (typeof plugin.afterStoryStateChange === 'function') {
      plugin.afterStoryStateChange({
        storyState,
        lastLinkTags,
        updatedStateProps,
        currentPassageObject: getPassagesMap().passagesMap[name],
      });
    }
  });
};
