import {
  createMidrenderSignalAction,
} from '../../actions/creators/createMidrenderSignalAction';
import {
  Cycler,
} from '../Cycler/Cycler';
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
  IState,
} from '../../state/IState';
import {
  mutateCurrentStoryStateInstanceWithPluginExecution,
} from '../../state/mutateCurrentStoryStateInstanceWithPluginExecution';
import {
  object as ObjectProp,
} from 'prop-types';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
  Store,
} from 'redux';

import * as React from 'react';

export class CyclingLinkUnconnected extends React.PureComponent<
  ICyclingLinkOwnProps & ICyclingLinkDispatchProps
>
{
  public static contextTypes = {
    store: ObjectProp,
  };

  constructor(props: any) {
    super(props);
    this.receiveNotification = this.receiveNotification.bind(this);
  }

  public componentDidMount() {
    const {
      choices,
      dispatch,
      setStoryState,
      variableToSet,
    } = this.props;

    if (variableToSet && typeof variableToSet === 'string') {
      const { store }: { store: Store<IState> } = this.context;
      setStoryState({ [variableToSet]: choices[0] }, store);

      /* Issue a midrender signal action to prevent rewinding over state
       * assigned during the rendering process. */
      dispatch(createMidrenderSignalAction());
    }
  }

  public render() {
    const {
      choices,
      className,
    } = this.props;

    return (
      <Cycler
        className={`cyclingLink${className ? ` ${className}` : ''}`}
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

    const { store }: { store: Store<IState> } = this.context;

    if (variableToSet && typeof variableToSet === 'string') {
      setStoryState({ [variableToSet]: current }, store);
    }
  }
}

export const mapDispatchToProps: MapDispatchToProps<ICyclingLinkDispatchProps, ICyclingLinkOwnProps> = (dispatch: Dispatch<IAction>) => ({
  dispatch,
  setStoryState(updatedStateProps, store) {
    mutateCurrentStoryStateInstanceWithPluginExecution(updatedStateProps, store);
  },
});

export const CyclingLink = connect(
  null,
  mapDispatchToProps,
)(CyclingLinkUnconnected);
