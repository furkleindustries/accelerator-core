import {
  createStoryStateUpdateAction,
} from '../actions/creators/createStoryStateUpdateAction';
import {
  getPassagesMap,
} from '../passages/getPassagesMap';
import {
  getPluginsList,
} from '../plugins/getPluginsList';
import {
  IState,
} from '../reducers/IState';
import {
  IStoryStateInstance,
} from './IStoryStateInstance';
import {
  Store,
} from 'redux';

/* Do NOT call this from within a plugin -- there is a very high chance you'll
 * cause an infinite loop, then a stack overflow. */
export const mutateCurrentStoryStateInstanceWithPluginExecution = (updatedStateProps: Partial<IStoryStateInstance>, store: Store<IState>) => {
  const action = createStoryStateUpdateAction(updatedStateProps);
  store.dispatch(action);

  const state = store.getState();
  const {
    currentPassageName,
    passageHistory: [
      {
        linkTags: lastLinkTags, 
      },
    ],

    storyStateHistory: [
      currentStoryState,
    ],
  } = state;

  const {
    passagesMap,
  } = getPassagesMap();

  const plugins = getPluginsList();
  plugins.forEach((plugin) => {
    if (typeof plugin.afterStoryStateChange === 'function') {
      plugin.afterStoryStateChange({
        currentStoryState,
        lastLinkTags,
        updatedStateProps,
        currentPassageObject: passagesMap[currentPassageName],
      });
    }
  });
};

export default mutateCurrentStoryStateInstanceWithPluginExecution;
