import {
  createSoundManagerStateUpdateAction,
} from '../actions/creators/createSoundManagerStateUpdateAction';
import {
  getGroupVolumesFromSession,
} from './getGroupVolumesFromSession';
import {
  getManagerVolumeFromSession,
} from './getManagerVolumeFromSession';
import {
  ISoundManagerStateFrame,
} from './ISoundManagerStateFrame';
import {
  IState,
} from './IState';
import type {
  Store,
} from 'redux';
import {
  IManager,
  isValidVolume,
} from 'sound-manager';

export const populateSoundManagerStateToRedux = (
  {
    collection: { groups },
    setVolume: setManagerVolume,
  }: IManager,

  {
    dispatch,
    getState,
    subscribe,
  }: Store<IState>,

  getSessionVolumesForGroups = true,
) => {
  const unsubscribe = subscribe(() => {
    const {
      soundManagerState: currentState,
      soundsLoaded,
      storyLoaded,
    } = getState();

    if (!soundsLoaded || !storyLoaded) {
      return;
    }

    unsubscribe();

    const sessionVolumes = getGroupVolumesFromSession();
    const managerVolume = getManagerVolumeFromSession();

    if (isValidVolume(managerVolume)) {
      setManagerVolume(managerVolume);
    }

    const soundManagerState: ISoundManagerStateFrame = {
      ...currentState,
      managerVolume,
    };

    const sortedReversedGroupNames = Object.keys(groups).sort().reverse();
    sortedReversedGroupNames.forEach((groupName) => {
      const {
        [groupName]: {
          getLabel,
          getSound,
          getVolume,
          setVolume,
          sounds,
        }, 
      } = groups;

      const label = getLabel();
      let volume = getVolume();
      if (getSessionVolumesForGroups &&
        isValidVolume(sessionVolumes[groupName]))
      {
        volume = sessionVolumes[groupName];
        setVolume(volume);
      }

      Object.assign(soundManagerState, {
        groups: {
          ...soundManagerState.groups,
          [groupName]: {
            groupName,
            label,
            volume,
          },
        },
      });

      const sortedSoundNames = Object.keys(sounds).sort();
      sortedSoundNames.forEach((soundName) => {
        const {
          getFade,
          getLabel,
          getLoop,
          isPlaying,
          getVolume,
        } = getSound(soundName);

        const fade = getFade();
        const label = getLabel();
        const loop = getLoop();
        const playing = isPlaying();
        const startedTime = -1;
        const volume = getVolume();

        Object.assign(soundManagerState.sounds, {
          soundName: {
            groupName,
            soundName,
            fade,
            label,
            loop,
            playing,
            startedTime,
            volume,
          },
        });
      });
    });

    dispatch(createSoundManagerStateUpdateAction({ ...soundManagerState }));
  });
};
