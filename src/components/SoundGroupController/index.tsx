import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  createSoundManagerGroupStateUpdateAction,
} from '../../actions/creators/createSoundManagerSoundGroupUpdateAction';
import {
  ISoundGroupControllerOwnProps,
} from './ISoundGroupControllerOwnProps';
import {
  ISoundGroupControllerStateProps,
} from './ISoundGroupControllerStateProps';
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
import {
  updateSoundGroupSessionVolume,
} from '../../state/updateSoundGroupSessionVolume';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export const SoundGroupControllerUnconnected: React.FC<
  ISoundGroupControllerOwnProps &
    ISoundGroupControllerStateProps
> = React.memo(
  ({
    className,
    groupState,
    groupState: {
      groupName,
      volume,
    },
  }) => (
    <AppContextConsumerWrapper>
      {({
        config: {
          loggers: { warn },
        },

        getSoundManager,
        store: { dispatch },
      }) => {
        const {
          collection: { setGroupVolume },
        } = getSoundManager();

        let throttler: any;
        const volumeSetter = (evt: React.ChangeEvent<HTMLInputElement>) => {
          evt.persist();

          const volume = Number(evt.currentTarget.value)
          setGroupVolume(volume, groupName);

          if (!throttler) {
            throttler = throttle((volume: number) => {
              updateSoundGroupSessionVolume(
                {
                  groupName,
                  volume,
                },

                warn,
              );

              dispatch(createSoundManagerGroupStateUpdateAction({
                ...groupState,
                volume,
              }));
            }, 650);
          }

          throttler(volume);
        };

        const volumeId = `group-volume-${groupName}-${volume}`;

        return (
          <div
            className={classNames(
              styles['sound-group-controller'],
              'sound-group-controller',
              className,
            )}

            role="group"
          >
            <Typography
              className={classNames(
                styles['sound-group-controller-group-volume-label'],
                'sound-group-controller-group-volume-label',
              )}

              component="label"
              htmlFor={volumeId}
            >
              Adjust group volume
            </Typography>

            <input
              className={classNames(
                styles['sound-group-controller-volume-input'],
                'sound-group-controller-volume-input',
              )}

              defaultValue={volume}
              id={volumeId}
              name={`Group ${groupName} volume`}
              max={1}
              min={0}
              onChange={volumeSetter}
              step={0.01}
              tabIndex={0}
              title={`Group ${groupName} volume: ${volume.toString()}`}
              type="range"
            />
          </div>
        );
      }}
    </AppContextConsumerWrapper>
  ),

  (
    {},
    { soundsState: nextSoundsState },
  ) => (
    Boolean(Object.keys(nextSoundsState).length)
  ),
);

SoundGroupControllerUnconnected.displayName = 'SoundGroupControllerUnconnected';

export const mapStateToProps: MapStateToProps<
  ISoundGroupControllerStateProps,
  ISoundGroupControllerOwnProps,
  IState
> = (
  {
    soundManagerState: {
      groups,
      sounds,
    },
  },

  { groupName },
) => ({
  groupState: groups[groupName],
  soundsState: Object.entries(sounds).reduce((
    prev,
    [
      soundName,
      soundState,
    ],
  ) => ({
    ...prev,
    ...(soundState.playing ? { [soundName]: soundState } : {}),
  }), {}),
});

export const SoundGroupController = connect(
  mapStateToProps,
)(SoundGroupControllerUnconnected);
