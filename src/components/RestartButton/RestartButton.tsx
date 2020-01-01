import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
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
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_INVALID:
    'The passage name provided to RestartButton did not match a passage ' +
    'name in the passages map.',
};

export class RestartButtonUnconnected extends React.PureComponent<
  IRestartButtonOwnProps & IRestartButtonStateProps & IRestartButtonDispatchProps
>
{
  public render = () => {
    const {
      children,
      className,
    } = this.props;

    return (
      <AppContextConsumerWrapper>
        {({
          passagesMap,
          plugins,
        }) => {
          const boundRestart = this.restart.bind(
            this,
            passagesMap,
            plugins,
          );

          return (
            <Button
              className={classNames(
                'navigationButton',
                'resetButton',
                className,
              )}

              onClick={boundRestart}
            >
              {children}
            </Button>
          );
        }}
      </AppContextConsumerWrapper>
    );
  };

  private restart = (
    passagesMap: IPassagesMap,
    plugins: readonly IPlugin[],
  ) => {
    const {
      passageName,
      storyState,
      dispatch,
      lastLinkTags,
    } = this.props;

    const { [passageName]: passageObject } = passagesMap;

    assert(passageObject, strings.PASSAGE_INVALID);

    reset({
      dispatch,
      lastLinkTags,
      passageObject,
      plugins,
      storyState,
    });
  }
}

export const mapStateToProps: MapStateToProps<IRestartButtonStateProps, IRestartButtonOwnProps, IState> = ({
  history: {
    present: {
      lastLinkTags,
      passageName,
      storyState,
    },
  },
}) => ({
  passageName,
  storyState,
  lastLinkTags,
});

export const mapDispatchToProps: MapDispatchToProps<IRestartButtonDispatchProps, IRestartButtonOwnProps> = (dispatch) => ({
  dispatch,
});

export const RestartButton = connect(mapStateToProps, mapDispatchToProps)(RestartButtonUnconnected);
