import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  createSoundManagerSoundStateUpdateAction,
} from '../../actions/creators/createSoundManagerSoundStateUpdateAction';
import {
  ISoundControllerOwnProps,
} from './ISoundControllerOwnProps';
import {
  ISoundControllerStateProps,
} from './ISoundControllerStateProps';
import {
  IState,
} from '../../state/IState';
import throttle from 'lodash.throttle';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export const SoundControllerUnconnected: React.FC<
  ISoundControllerOwnProps &
    ISoundControllerStateProps
> = React.memo(
  ({
    className,
    groupName,
    soundName,
    soundState,
    soundState: { volume },
  }) => (
    <AppContextConsumerWrapper>
      {({
        getSoundManager,
        store: { dispatch },
      }) => {
        const {
          collection: { setSoundVolume },
        } = getSoundManager();

        let throttler: any;
        const setSoundVolumeFunc = (evt: React.ChangeEvent<HTMLInputElement>) => {
          evt.persist();

          const volume = Number(evt.currentTarget.value);
          setSoundVolume(soundName, volume, groupName);

          if (!throttler) {
            throttler = throttle((volume: number) => {
              dispatch(createSoundManagerSoundStateUpdateAction({
                ...soundState,
                volume,
              }));
            }, 650);
          }

          throttler(volume);
        };

        const volumeId = `sound-volume-${soundName}-${groupName}`;

        return (
          <div
            className={classNames(
              styles['sound-controller'],
              'sound-controller',
              className,
            )}

            role="group"
          >
            <div role="group">
              <Typography
                className={classNames(
                  styles['sound-controller-volume-label'],
                  'sound-controller',
                )}

                component="label"
                htmlFor={volumeId}
              >
                Adjust sound volume
              </Typography>

              <input
                className={classNames(
                  styles['sound-controller-volume-input'],
                  'sound-controller-volume-input',
                )}

                defaultValue={volume}
                id={volumeId}
                max={1}
                min={0}
                name="Sound volume"
                onChange={setSoundVolumeFunc}
                step={0.01}
                tabIndex={0}
                title={`${soundName}-${groupName} volume: ${volume}`}
                type="range"
              />
            </div>
          </div>
        );
      }}
    </AppContextConsumerWrapper>
  ),

  (
    {
      soundState: {
        playing: playingPrev,
      },
    },

    {
      soundState: {
        playing: playingNext,
      },
    },
  ) => (
    playingPrev === playingNext
  ),
);

SoundControllerUnconnected.displayName = 'SoundControllerUnconnected';

export const mapStateToProps: MapStateToProps<
  ISoundControllerStateProps,
  ISoundControllerOwnProps,
  IState
> = (
  { soundManagerState },
  { soundName },
) => ({
  soundState: soundManagerState.sounds[soundName],
});

export const SoundController = connect(
  mapStateToProps,
)(SoundControllerUnconnected);
