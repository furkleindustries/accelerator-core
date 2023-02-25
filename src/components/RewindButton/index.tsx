import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  IRewindButtonOwnProps,
} from './IRewindButtonOwnProps';
import {
  IRewindButtonDispatchProps,
} from './IRewindButtonDispatchProps';
import {
  IRewindButtonStateProps,
} from './IRewindButtonStateProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  rewind,
} from '../../state/rewind';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const RewindButtonUnconnected: React.FC<
  IRewindButtonOwnProps &
    IRewindButtonStateProps &
    IRewindButtonDispatchProps
> = ({
  canRewind,
  children,
  className,
  disabled,
  dispatch,
  history,
  soundGroupsToStop,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({ getSoundManager }) => {
      const rewindFunc = () => rewind(dispatch, getSoundManager);

      const statefulProps = canRewind ?
        { onClick: rewindFunc } :
        { disabled: true };

      return (
        <Button
          {...props}

          disabled={disabled || !canRewind}

          {...statefulProps}

          centerRipple={true}
          className={classNames(
            builtIns['navigation-button'],
            'navigation-button',
            builtIns['rewind-button'],
            'rewind-button',
            className,
            { disabled: disabled || !canRewind },
          )}

          color="secondary"
        >
          <span
            className={classNames(
              builtIns['app-bar-label'],
              'app-bar-label',
              builtIns['navigation-button-label'],
              'navigation-button-label',
              builtIns['rewind-button-label'],
              'rewind-button-label',
            )}
          >
            {children || 'Rewind'}
          </span>
        </Button>
      );
    }}
  </AppContextConsumerWrapper>
);

export const mapStateToProps: MapStateToProps<
  IRewindButtonStateProps,
  IRewindButtonOwnProps,
  IState
> = ({
  history,
  history: {
    present: { passageTimeCounter },
  },
}) => ({
  history,
  canRewind: passageTimeCounter > 0,
});

export const mapDispatchToProps: MapDispatchToProps<
  IRewindButtonDispatchProps,
  IRewindButtonOwnProps
> = (dispatch) => ({ dispatch });

export const RewindButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  // weird redux typing bug
  // @ts-ignore
  RewindButtonUnconnected
);
