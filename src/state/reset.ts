import {
  createStoryResetAction,
} from '../actions/creators/createStoryResetAction';
import {
  IResetStoryArgs,
} from './IResetStoryArgs';
import {
  pushToSaveRegistry,
} from '../../plugins/save-manager/pushToSaveRegistry';
import {
  ActionCreators,
} from 'redux-undo';
import {
  stopAllSoundsAutomatically,
} from '../functions/stopAllSoundsAutomatically';

export const reset = ({
  autoplayerState,
  config,
  getSoundManager,
  lastLinkTags,
  passageObject,
  plugins,
  store,
  storyState,
}: IResetStoryArgs) => {
  plugins.forEach(({ beforeRestart }) => {
    if (typeof beforeRestart === 'function') {
      beforeRestart({
        autoplayerState,
        config,
        getSoundManager,
        lastLinkTags,
        passageObject,
        storyState,
      });
    }
  });

  if (typeof getSoundManager === 'function') {
    stopAllSoundsAutomatically(
      { ...getSoundManager().collection.groups },
      config.soundManager.excludeFromAutomaticStop,
    );
  }

  store.dispatch(ActionCreators.clearHistory());

  const lastModified = new Date().getTime();
  const saveName = 'Autosave';
  const uuid = saveName;

  pushToSaveRegistry(
    {
      currentPassageName: config.startPassageName,
      lastModified,
      saveName,
      uuid,
    },

    store,
    config.historyFramesToSerialize,
  );

  return store.dispatch(createStoryResetAction());
};
