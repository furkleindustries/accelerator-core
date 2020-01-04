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

export class RewindButtonUnconnected extends React.PureComponent<
  IRewindButtonOwnProps &
    IRewindButtonStateProps &
    IRewindButtonDispatchProps
>
{
  public render = () => {
    const {
      canRewind,
      children,
      className,
    } = this.props;

    const statefulProps = canRewind ?
      { onClick: this.rewind } :
      { disabled: true };

    return (
      <Button
        {...statefulProps}
        className={classNames(
          'navigationButton',
          'rewindButton',
          className,
        )}
      >
        {children}
      </Button>
    );
  }

  private rewind = () => {
    const {
      dispatch,
      history: {
        past,
        present,
      },
    } = this.props;

    rewind(dispatch, present, past);
  };
}

export const mapStateToProps: MapStateToProps<
  IRewindButtonStateProps,
  IRewindButtonOwnProps,
  IState
> = ({
  history,
  history: { past },
}, { filter }) => ({
  history,
  canRewind: Boolean(
    typeof filter === 'function' ? past.filter(filter).length : past.length
  ),
});

export const mapDispatchToProps: MapDispatchToProps<
  IRewindButtonDispatchProps,
  IRewindButtonOwnProps
> = (dispatch) => ({ dispatch });

export const RewindButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RewindButtonUnconnected);
