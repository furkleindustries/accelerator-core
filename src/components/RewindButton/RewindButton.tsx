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

export class RewindButton extends React.PureComponent<IRewindButtonOwnProps & IRewindButtonStateProps & IRewindButtonDispatchProps> {
  constructor(props: any) {
    super(props);

    this.rewind = this.rewind.bind(this);
  }
  
  render() {
    const {
      canRewind,
      children,
      className,
    } = this.props;

    const statefulProps = canRewind ?
      { onClick: this.rewind } :
      { disabled: true };

    return (
      <button
        className={`rewindButton navigationButton${className ? ` ${className}` : ''}`}
        {...statefulProps}
      >
        {children}
      </button>
    );
  }

  private rewind() {
    const { dispatch } = this.props;
    rewind(dispatch);
  }
}

export const mapStateToProps: MapStateToProps<IRewindButtonStateProps, IRewindButtonOwnProps, IState> = ({
  history: {
    past: { length }
  },
}) => ({
  canRewind: length > 1,
});

export const mapDispatchToProps: MapDispatchToProps<
  IRewindButtonDispatchProps,
  IRewindButtonOwnProps
> = (dispatch) => ({
  dispatch,
});

export const RewindButtonConnected = connect(mapStateToProps, mapDispatchToProps)(RewindButton);
