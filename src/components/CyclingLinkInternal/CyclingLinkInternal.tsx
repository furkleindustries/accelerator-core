import classnames from 'classnames';
import {
  createMidrenderSignalAction,
} from '../../actions/creators/createMidrenderSignalAction';
import {
  Cycler,
} from '../Cycler/Cycler';
import {
  ICyclingLinkInternalDispatchProps,
} from './ICyclingLinkInternalDispatchProps';
import {
  ICyclingLinkInternalOwnProps,
} from './ICyclingLinkInternalOwnProps';
import {
  ICyclingLinkInternalStateProps,
} from './ICyclingLinkInternalStateProps';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IState,
} from '../../state/IState';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  mutateCurrentStoryStateInstanceWithPluginExecution,
} from '../../state/mutateCurrentStoryStateInstanceWithPluginExecution';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  FIRST_STATE_EMPTY:
    'The first state was not provided to the CyclingLinkInternal component, ' +
    'or it was an empty string.',

  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

export class CyclingLinkInternal extends React.PureComponent<
  ICyclingLinkInternalOwnProps &
  ICyclingLinkInternalStateProps &
  ICyclingLinkInternalDispatchProps
> {
  public componentDidMount = () => {
    const {
      callback,
      children,
      dispatch,
      dontCallbackOnMount,
      dontSetVariableOnMount,
      variableToSet,
    } = this.props;

    const firstState = assertValid<string>(
      children[0],
      strings.FIRST_STATE_EMPTY,
    );
  
    if (!dontSetVariableOnMount &&
        variableToSet &&
        typeof variableToSet === 'string')
    {
      this.setStoryState({ [variableToSet]: firstState });
  
      /* Issue a midrender signal action to prevent rewinding over state
       * assigned during the rendering process. */
      dispatch(createMidrenderSignalAction());
  
      if (!dontCallbackOnMount && typeof callback === 'function') {
        callback(firstState);
      }
    }
  };

  public render = () => (
    <Cycler
      callback={this.doCallback}
      className={classnames(this.props.className)}
    >
      {this.props.children}
    </Cycler>
  );

  private doCallback = (current: string) => {
    const {
      callback,
      variableToSet,
    } = this.props;

    if (variableToSet && typeof variableToSet === 'string') {
      this.setStoryState({ [variableToSet]: current });
    }

    if (typeof callback === 'function') {
      callback(current);
    }
  };

  private setStoryState = (updatedStateProps: Partial<IStoryStateFrame>) => {
    const {
      dispatch,
      history,
      history: {
        present: { passageName },
      },

      passagesMap,
      plugins,
    } = this.props;

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND.replace('%NAME%', passageName),
    );

    mutateCurrentStoryStateInstanceWithPluginExecution({
      dispatch,
      history,
      passageObject,
      plugins,
      updatedStateProps,
    });
  }
}

export const mapStateToProps: MapStateToProps<
  ICyclingLinkInternalStateProps,
  ICyclingLinkInternalOwnProps,
  IState
> = ({ history }) => ({ history });

export const mapDispatchToProps: MapDispatchToProps<
  ICyclingLinkInternalDispatchProps,
  ICyclingLinkInternalOwnProps
> = (dispatch) => ({ dispatch });

export const CyclingLinkInternalConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CyclingLinkInternal);
