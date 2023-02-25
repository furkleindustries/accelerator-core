import classNames from 'classnames';
import {
  Cycler,
} from '../Cycler';
import {
  ICyclingLinkInternalDispatchProps,
} from './ICyclingLinkInternalDispatchProps';
import {
  ICyclingLinkInternalOwnProps,
} from './ICyclingLinkInternalOwnProps';
import {
  ICyclingLinkInternalState,
} from './ICyclingLinkInternalState';
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
  IStoryStateSetter,
} from '../../interfaces/IStoryStateSetter';
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
    ICyclingLinkInternalDispatchProps,
  ICyclingLinkInternalState
> {
  public readonly state = { startIndex: 0 };

  constructor(props:
    ICyclingLinkInternalOwnProps &
      ICyclingLinkInternalStateProps &
      ICyclingLinkInternalDispatchProps)
  {
    super(props);

    const {
      callback,
      children,
      history: {
        present: { storyState },
      },

      dontCallbackOnMount,
      dontSetVariableOnMount,
      variableToSet,
    } = props;
  
    if (!dontSetVariableOnMount &&
        variableToSet &&
        typeof variableToSet === 'string')
    {
      if (typeof storyState[variableToSet] !== 'undefined') {
        const index = children.indexOf(storyState[variableToSet]);
        this.state = { startIndex: index === -1 ? 0 : index };
      }

      const firstState = assertValid<string>(
        children[this.state.startIndex],
        strings.FIRST_STATE_EMPTY,
      );

      /* If this is not guarded by whether the story state already contains
       * this value, it will re-render to the React limit and then break. */
      if (storyState[variableToSet] !== firstState) {
        this.setStoryState({ [variableToSet]: firstState });
      }


      if (!dontCallbackOnMount && typeof callback === 'function') {
        callback(firstState);
      }
    }
  };

  public render = () => (
    <Cycler
      callback={this.doCallback}
      className={classNames('cycling-link', this.props.className)}
      startIndex={this.state.startIndex}
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

  private setStoryState: IStoryStateSetter = (updatedStateProps) => {
    const {
      autoplayerState,
      dispatch,
      getSoundManager,
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
      autoplayerState,
      dispatch,
      getSoundManager,
      history,
      passageObject,
      plugins,
      updatedStateProps,
    });
  };
}

export const mapStateToProps: MapStateToProps<
  ICyclingLinkInternalStateProps,
  ICyclingLinkInternalOwnProps,
  IState
> = ({
  autoplayerState,
  history,
}) => ({
  autoplayerState,
  history,
});

export const mapDispatchToProps: MapDispatchToProps<
  ICyclingLinkInternalDispatchProps,
  ICyclingLinkInternalOwnProps
> = (dispatch) => ({ dispatch });

export const CyclingLinkInternalConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CyclingLinkInternal);
