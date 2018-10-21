import {
  Cycler,
} from '../Cycler/Cycler';
import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  IAction,
} from '../../actions/IAction';
import {
  ICyclingLinkDispatchProps,
} from './ICyclingLinkDispatchProps';
import {
  ICyclingLinkOwnProps,
} from './ICyclingLinkOwnProps';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';

import * as React from 'react';

export class CyclingLink extends React.Component<ICyclingLinkOwnProps & ICyclingLinkDispatchProps> {
  public render() {
    const {
      choices,
      className,
    } = this.props;

    return (
    <Cycler
      className={className}
      notifyOfChange={this.receiveNotification}
    >
      {choices}
    </Cycler>
    );
  }

  private receiveNotification(current: string) {
    const {
      setStoryState,
      variableToSet,
    } = this.props;

    if (variableToSet && typeof variableToSet === 'string') {
      setStoryState({
        [variableToSet]: current,
      });
    }
  }
}

export const mapDispatchToProps: MapDispatchToProps<ICyclingLinkDispatchProps, ICyclingLinkOwnProps> = (dispatch: Dispatch<IAction>) => ({
  setStoryState(newState) {
    return dispatch(createStoryStateAction(newState));
  }
});

export const CyclingLinkConnected = connect(null, mapDispatchToProps)(CyclingLink);

export default CyclingLinkConnected;
