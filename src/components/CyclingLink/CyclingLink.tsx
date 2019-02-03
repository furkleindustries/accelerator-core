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
  ICyclingLinkStateProps,
} from './ICyclingLinkStateProps';
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
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export class CyclingLinkUnconnected extends React.PureComponent<
  ICyclingLinkOwnProps & ICyclingLinkStateProps & ICyclingLinkDispatchProps
>
{
  public static contextTypes = {
    context: ObjectProp,
  };

  constructor(props: any) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  public componentDidMount() {
    const {
      callback,
      children,
      dispatch,
      dontCallbackOnMount,
      dontSetVariableOnMount,
      history,
      setStoryState,
      variableToSet,
    } = this.props;

    const firstState = assertValid<string>(
      children[0],
    );

    if (!dontSetVariableOnMount &&
        variableToSet &&
        typeof variableToSet === 'string')
    {
      setStoryState({ [variableToSet]: firstState }, history);

      /* Issue a midrender signal action to prevent rewinding over state
       * assigned during the rendering process. */
      dispatch(createMidrenderSignalAction());

      if (!dontCallbackOnMount && typeof callback === 'function') {
        callback(firstState);
      }
    }
  }

  public render() {
    const {
      children,
      className,
    } = this.props;

    return (
      <Cycler
        callback={this.callback}
        className={`cyclingLink${className ? ` ${className}` : ''}`}
      >
        {children}
      </Cycler>
    );
  }

  private callback(current: string) {
    const {
      callback,
      history,
      setStoryState,
      variableToSet,
    } = this.props;

    if (variableToSet && typeof variableToSet === 'string') {
      setStoryState({ [variableToSet]: current }, history);
    }

    if (typeof callback === 'function') {
      callback(current);
    }
  }
}

export const mapStateToProps: MapStateToProps<
  ICyclingLinkStateProps,
  ICyclingLinkOwnProps,
  IState
> = ({ history }) => ({ history });

export const mapDispatchToProps: MapDispatchToProps<ICyclingLinkDispatchProps, ICyclingLinkOwnProps> = (dispatch: Dispatch<IAction>) => ({
  dispatch,
  setStoryState(updatedStateProps, history) {
    mutateCurrentStoryStateInstanceWithPluginExecution({
      dispatch,
      history,
      updatedStateProps,
    });
  },
});

export const CyclingLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CyclingLinkUnconnected);
