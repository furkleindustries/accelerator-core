import classNames from 'classnames';
import {
  ISoundGroupViewTitleStateProps,
} from './ISoundGroupViewTitleStateProps';
import {
  ISoundGroupViewTitleOwnProps,
} from './ISoundGroupViewTitleOwnProps';
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

export const SoundGroupViewTitleUnconnected: React.FC<
  ISoundGroupViewTitleOwnProps &
    ISoundGroupViewTitleStateProps
> = React.memo(({
  groupName,
  groupState: {
    label: { title },
  },
}) => (
  <Typography
    className={classNames(
      styles['sound-group-view-title'],
      'sound-group-view-title',
    )}

    variant="h3"
  >
    {title || groupName}
  </Typography>
));

SoundGroupViewTitleUnconnected.displayName = 'SoundGroupViewTitleUnconnected';

export const mapStateToProps: MapStateToProps<
  ISoundGroupViewTitleStateProps,
  ISoundGroupViewTitleOwnProps,
  IState
> = (
  { soundManagerState },
  { groupName },
) => ({ groupState: soundManagerState.groups[groupName] });

export const SoundGroupViewTitle = connect(
  mapStateToProps,
)(SoundGroupViewTitleUnconnected);
