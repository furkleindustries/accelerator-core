import classNames from 'classnames';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  ISoundManagerViewDispatchProps,
} from './ISoundManagerViewDispatchProps';
import {
  ISoundManagerViewOwnProps,
} from './ISoundManagerViewOwnProps';
import {
  ISoundManagerViewStateProps,
} from './ISoundManagerViewStateProps';
import {
  IState,
} from '../../state/IState';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import memoize from 'memoize-one';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  SoundGroupView,
} from '../SoundGroupView';
import {
  SoundManagerController,
} from '../SoundManagerController';

import * as React from 'react';

import styles from '../../../options/sound-manager/sound-manager.less';

export class SoundManagerViewUnconnected extends React.PureComponent<
  ISoundManagerViewOwnProps &
    ISoundManagerViewStateProps &
    ISoundManagerViewDispatchProps
> {
  /* Implement but don't use. We don't want to block anything as a result of
   * sound errors. They should instead match the general error handling of
   * streaming media — if it doesn't work, just log the failure and move on. */
  public static getDerivedStateFromError = () => ({});

  // Ensure that errors in reading out sound state don't break the app.
  public readonly componentDidCatch = (error: Error) => {
    const { debug } = this.props;

    const {
      loggers: {
        log,
        warn,
      },
    } = getNormalizedAcceleratorConfig();


    if (debug) {
      log('---- Sound Manager ----');
      log('An error was encountered in the Sound Manager view.');
    }

    if (error.stack) {
      warn(error.message);
      warn(error.stack);
    } else {
      warn(error.toString());
    }

    if (debug) {
      log('--------');
    }
  };

  public readonly render = () => {
    const {
      className,
      groupsState,
      listRole,
      role,
      soundsLoaded,
    } = this.props;

    const groupsOutput = this.memoize(groupsState, soundsLoaded);

    return (
      <div
        className={classNames(
          styles['sound-manager-view'],
          'sound-manager-view',
          className,
        )}

        role={role || 'group'}
      >
        <SoundManagerController />

        <List
          className={classNames(
            styles['sound-manager-view-list'],
            'sound-manager-view-list',
          )}

          role={listRole || 'feed'}
        >
          {groupsOutput}
        </List>
      </div>
    );
  };

  public readonly memoize = memoize((
    groupsState: this['props']['groupsState'],
    soundsLoaded: this['props']['soundsLoaded'],
  ) => {
    if (!soundsLoaded) {
      return [
        <ListItem
          className={classNames(
            styles['sound-manager-view-list-item'],
            'sound-manager-view-list-item',
          )}

          key={-1}
          role="menuitem"
        >
          The sounds are still loading. Please wait.
        </ListItem>
      ];
    }

    return (
      Object.keys(groupsState).map((groupName) => (
        <ListItem
          className={classNames(
            styles['sound-manager-view-list-item'],
            'sound-manager-view-list-item',
          )}

          key={groupName}
          role="menuitem"
        >
          <SoundGroupView groupName={groupName} />
        </ListItem>
      ))
    );
  });
}

export const mapStateToProps: MapStateToProps<
  ISoundManagerViewStateProps,
  ISoundManagerViewOwnProps,
  IState
> = ({
  debug,
  soundManagerState: { groups: groupsState },
  soundsLoaded,
}) => ({
  debug,
  groupsState,
  soundsLoaded,
});

export const mapDispatchToProps: MapDispatchToProps<
  ISoundManagerViewDispatchProps,
  ISoundManagerViewOwnProps
> = (dispatch) => ({ dispatch });

export const SoundManagerView = connect(mapStateToProps, mapDispatchToProps)(
  SoundManagerViewUnconnected,
);
