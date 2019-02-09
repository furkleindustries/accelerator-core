import {
  getPassagesMapAndStartPassage,
} from '../../passages/getPassagesMapAndStartPassage';
import {
  IRestartButtonDispatchProps,
} from './IRestartButtonDispatchProps';
import {
  IRestartButtonOwnProps,
} from './IRestartButtonOwnProps';
import {
  IRestartButtonStateProps,
} from './IRestartButtonStateProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  reset,
} from '../../state/reset';

import manifest from '../../../passages/passages-manifest';

import * as React from 'react';

const { passagesMap } = getPassagesMapAndStartPassage(manifest);

export class RestartButtonUnconnected extends React.PureComponent<
  IRestartButtonOwnProps & IRestartButtonStateProps & IRestartButtonDispatchProps
>
{
  constructor(props: any) {
    super(props);
    this.restart = this.restart.bind(this);
  }
  
  public render() {
    const {
      children,
      className,
    } = this.props;

    return (
      <button
        className={`resetButton navigationButton${className ? ` ${className}` : ''}`}
        onClick={this.restart}
      >
        {children}
      </button>
    );
  }

  private restart() {
    const {
      currentPassageObject,
      currentStoryState,
      dispatch,
      lastLinkTags,
    } = this.props;

    reset({
      currentPassageObject,
      storyState: currentStoryState,
      dispatch,
      lastLinkTags,
    });
  }
}

export const mapStateToProps: MapStateToProps<IRestartButtonStateProps, IRestartButtonOwnProps, IState> = ({
  history: {
    present: {
      currentPassageName: name,
      lastLinkTags,
      storyState: currentStoryState,
    },
  },
}) =>
({
  currentPassageObject: passagesMap[name],
  currentStoryState,
  lastLinkTags,
});

export const mapDispatchToProps: MapDispatchToProps<IRestartButtonDispatchProps, IRestartButtonOwnProps> = (dispatch) => ({
  dispatch,
});

export const RestartButton = connect(mapStateToProps, mapDispatchToProps)(RestartButtonUnconnected);
