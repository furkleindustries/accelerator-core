import classNames from 'classnames';
import {
  ISoundViewOwnProps,
} from './ISoundViewOwnProps';
import {
  SoundController,
} from '../SoundController';
import {
  SoundViewLabel,
} from '../SoundViewLabel';
import {
  SoundViewTitle,
} from '../SoundViewTitle';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export const SoundView: React.FC<
  ISoundViewOwnProps
> = React.memo((props) => {
  if (!props || !props.groupName || !props.soundName) {
    return null;
  }

  const {
    className,
    groupName,
    soundName,
  } = props;

  return (
    <div
      className={classNames(
        styles['sound-view'],
        'sound-view',
        className,
      )}

      key="sound-view"
      role="group"
    >
      <SoundViewTitle soundName={soundName} />

      <SoundController
        groupName={groupName}
        soundName={soundName}
      />

      <SoundViewLabel soundName={soundName} />
    </div>
  );
});

SoundView.displayName = 'SoundView';
