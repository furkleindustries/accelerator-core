import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  createSoundManagerStateUpdateAction,
} from '../../actions/creators/createSoundManagerStateUpdateAction';
import {
  ISoundManagerControllerOwnProps,
} from './ISoundManagerControllerOwnProps';
import throttle from 'lodash.throttle';
import {
  Typography
} from '../Typography';
import {
  updateSoundManagerSessionVolume,
} from '../../state/updateSoundManagerSessionVolume';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export const SoundManagerController: React.FC<ISoundManagerControllerOwnProps> = ({
  className,
  role,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({
      config: {
        loggers: { warn },
      },

      getSoundManager,
      store: {
        dispatch,
        getState,
      },
    }) => {
      const {
        getVolume,
        setVolume,
      } = getSoundManager();

      const managerVolume = getVolume();

      let throttler: any;
      const volumeSetter = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.persist();

        const volume = Number(evt.currentTarget.value)
        setVolume(volume);

        if (!throttler) {
          throttler = throttle((managerVolume: number) => {
            updateSoundManagerSessionVolume(
              managerVolume,
              warn,
            );

            dispatch(createSoundManagerStateUpdateAction({
              ...getState().soundManagerState,
              managerVolume,
            }));
          }, 650);
        }

        throttler(volume);
      };

      const sliderId = 'sound-manager-volume-slider';

      return (
        <div
          {...props}

          className={classNames(
            styles['sound-manager-controller'],
            'sound-manager-controller',
          )}

          role={role || 'group'}
        >
          <Typography
            className={classNames(
              styles['sound-manager-controller-label'],
              'sound-manager-controller-label',
            )}

            component="label"
            htmlFor={sliderId}
          >
            Adjust all volume
          </Typography>

          <input
            className={classNames(
              styles['sound-manager-controller-slider'],
              'sound-manager-controller-slider',
            )}

            defaultValue={managerVolume}
            id={sliderId}
            min={0}
            max={1}
            name="Sound manager volume"
            onChange={volumeSetter}
            step={0.01}
            tabIndex={0}
            title="Sound manager volume"
            type="range"
          />
        </div>
      );
    }}
  </AppContextConsumerWrapper>
);
