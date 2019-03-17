import {
  Button,
} from '../Button/Button';
import classnames from 'classnames';
import {
  getUnfilteredRewindIndex,
} from '../../state/getUnfilteredRewindIndex';
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
  IRewindButtonOwnProps & IRewindButtonStateProps & IRewindButtonDispatchProps
>
{
  constructor(props: any) {
    super(props);
    this.rewind = this.rewind.bind(this);
  }
  
  public render() {
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
        className={classnames(
          'rewindButton',
          'navigationButton',
          className,
        )}
        {...statefulProps}
      >
        {children}
      </Button>
    );
  }

  private rewind() {
    const {
      dispatch,
      history: {
        past,
        present,
      },
    } = this.props;

    rewind(dispatch, present, past);
  }
}

export const mapStateToProps: MapStateToProps<
  IRewindButtonStateProps,
  IRewindButtonOwnProps,
  IState
> = ({
  history,
  history: {
    past,
    present,
  },
}, { filter }) => {
  return {
    history,
    canRewind: (
      typeof filter === 'function' ?
        past.filter(filter).length > 0 :
        getUnfilteredRewindIndex(past, present) > 0
    ),
  };
};

export const mapDispatchToProps: MapDispatchToProps<
  IRewindButtonDispatchProps,
  IRewindButtonOwnProps
> = (dispatch) => ({ dispatch });

export const RewindButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RewindButtonUnconnected);
