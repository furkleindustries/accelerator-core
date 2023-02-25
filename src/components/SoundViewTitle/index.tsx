import classNames from 'classnames';
import {
  ISoundViewTitleOwnProps,
} from './ISoundViewTitleOwnProps';
import {
  ISoundViewTitleStateProps,
} from './ISoundViewTitleStateProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export const SoundViewTitleUnconnected: React.FC<
  ISoundViewTitleOwnProps &
    ISoundViewTitleStateProps
> = (({
  className,
  soundState: {
    label: { title },
  },

  soundName,
}) => (
  <Typography
    className={classNames(
      styles['sound-view-title'],
      'sound-view-title',
      className,
    )}

    variant="h4"
  >
    {title || soundName || 'Untitled sound'}
  </Typography>
));

export const mapStateToProps: MapStateToProps<
  ISoundViewTitleStateProps,
  ISoundViewTitleOwnProps,
  IState
> = (
  {
    soundManagerState: { sounds },
  },

  { soundName },
) => ({ soundState: sounds[soundName] });

export const SoundViewTitle = connect(
  mapStateToProps,
)(SoundViewTitleUnconnected);
