import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  IStopSoundOwnProps
} from './IStopSoundOwnProps';
import {
  stopSound,
} from '../../functions/stopSound';

import * as React from 'react';

export const StopSound: React.FC<IStopSoundOwnProps> = ({
  group: groupName = 'default',
  name: soundName,
}) => (
  <AppContextConsumerWrapper>
    {({
      config,
      getSoundManager,
      store: {
        dispatch,
        getState,
      },
    }) => {
    try {
      const { debug } = getState();

      const {
        collection: {
          getSound,
          hasSound,
        },
      } = getSoundManager();

      if (hasSound(soundName, groupName)) {
        const sound = getSound(soundName, groupName);
        if (sound.isPlaying()) {
          stopSound({
            config,
            debug,
            dispatch,
            groupName,
            sound,
            soundName,
          });
        }
      } else {
        config.loggers.error(`The sound "${soundName}" did not exist in group "${groupName}".`);
      }
    } catch (err) {
      config.loggers.error(`Sound Manager has encountered an error while attempting to stop the sound "${soundName}" from group "${groupName}".`);
      config.loggers.error(err);
    }

      return null;
    }}
  </AppContextConsumerWrapper>
);
