import classNames from 'classnames';
import {
  IState,
} from '../../state/IState';
import {
  ISoundGroupViewDispatchProps,
} from './ISoundGroupViewDispatchProps';
import {
  ISoundGroupViewOwnProps,
} from './ISoundGroupViewOwnProps';
import {
  ISoundGroupViewStateProps,
} from './ISoundGroupViewStateProps';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  SoundGroupController,
} from '../SoundGroupController';
import {
  SoundGroupViewTitle,
} from '../SoundGroupViewTitle';
import {
  SoundView,
} from '../SoundView';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export const SoundGroupViewUnconnected: React.FC<
  ISoundGroupViewOwnProps &
    ISoundGroupViewStateProps &
    ISoundGroupViewDispatchProps
> = (props) => {
  // Don't render any groups with no defined sounds, e.g. default.
  if (!props ||
    !props.groupName ||
    !props.soundsState ||
    !Object.keys(props.soundsState).length)
  {
    return null;
  }

  const {
    className,
    groupName,
    soundsState,
  } = props;

  const soundOutput = Object.entries(soundsState)
    .filter(([ soundName ]) => soundsState[soundName].playing)
    .sort((
      [
        ,
        soundObjOne,
      ],

      [
        ,
        soundObjTwo,
      ],
    ) => {      
      if (soundObjOne.startedTime > soundObjTwo.startedTime) {
        return 1;
      } else if (soundObjOne.startedTime < soundObjTwo.startedTime) {
        return -1;
      }

      return 0;
    }).map(([ soundName ]) => (
      <ListItem
        className={classNames(
          styles['sound-group-view-sound-list-item'],
          'sound-group-view-sound-list-item',
        )}

        key={soundName}
      >
        <SoundView
          groupName={groupName}
          soundName={soundName}
        />
      </ListItem>
    ));

  return (
    <div
      className={classNames(
        styles['sound-group-view'],
        'sound-group-view',
        className,
      )}

      role="group"
    >
      <div
        className={classNames(
          styles['sound-group-view-content-container'],
          'sound-group-view-content-container',
        )}

        role="group"
      >
        <SoundGroupViewTitle groupName={groupName} />

        <SoundGroupController groupName={groupName} />
      </div>

      <List
        className={classNames(
          styles['sound-group-view-sound-list'],
          'sound-group-view-sound-list',
        )}
      >
        {soundOutput}
      </List>
    </div>
  );
};

export const mapStateToProps: MapStateToProps<
  ISoundGroupViewStateProps,
  ISoundGroupViewOwnProps,
  IState
> = (
  {
    soundManagerState: { sounds },
  },

  { groupName },
) => ({
  soundsState: Object.keys(sounds).reduce((obj, soundName) => {
    const soundStateObj = sounds[soundName];
    if (soundStateObj.groupName === groupName) {
      return {
        ...obj,
        [soundName]: soundStateObj,
      };
    }

    return obj;
  }, {}),
});

export const SoundGroupView = connect(
  mapStateToProps,
)(SoundGroupViewUnconnected);
