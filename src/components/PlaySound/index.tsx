import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  IPlaySoundOwnProps,
} from './IPlaySoundOwnProps';
import {
  playSound,
} from '../../functions/playSound';

import * as React from 'react';

export const PlaySound = ({
  group: groupName = 'default',
  name: soundName,
  ...args
}: IPlaySoundOwnProps) => (
  <AppContextConsumerWrapper>
    {({
      config,
      config: {
        loggers: { warn },
      },

      getSoundManager,
      store: {
        dispatch,
        getState,
      },
    }) => {
      try {
        const { debug } = getState();

        const soundManager = getSoundManager();
        const {
          collection: {
            getGroup,
            hasGroup,
          },
        } = soundManager;

        if (hasGroup(groupName)) {
          const {
            getSound,
            hasSound,
          } = getGroup(groupName);

          if (hasSound(soundName)) {
            const sound = getSound(soundName);
            if (!sound.isPlaying()) {
              playSound({
                config,
                debug,
                dispatch,
                getSoundManager,
                groupName,
                soundName,
                ...args,
              });
            }
          } else {
            warn(`The sound ${soundName} did not exist in the Sound Manager group ${groupName}.`);
          }
        } else {
          warn(`The group ${groupName} did not exist in the Sound Manager collection.`);
        }
      } catch (err) {
        warn('An unknown error has occurred while playing a sound.');
        warn(err);
      }

      // Don't return anything.
      return null;
    }}
  </AppContextConsumerWrapper>
);
