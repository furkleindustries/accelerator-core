import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  Dialog,
} from '../Dialog';
import {
  IAcceleratorConfigNormalized,
} from '../../configuration/IAcceleratorConfigNormalized';
import {
  IPassage,
} from '../../passages/IPassage';
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
  IRestartButtonState,
} from './IRestartButtonState';
import {
  IRestartButtonStateProps,
} from './IRestartButtonStateProps';
import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import type {
  Store,
} from 'redux';
import {
  reset,
} from '../../state/reset';
import {
  assertValid,
} from 'ts-assertions';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const strings = {
  PASSAGE_INVALID:
    'The passage name provided to RestartButton did not match a passage ' +
    'name in the passages map.',
};

export class RestartButtonUnconnected extends React.PureComponent<
  IRestartButtonOwnProps &
    IRestartButtonStateProps &
    IRestartButtonDispatchProps,

  IRestartButtonState
>
{
  public readonly state: IRestartButtonState = { modalOpen: false };

  public render = () => {
    const {
      autoplayerState,
      children,
      className,
      disabled,
      dispatch,
      lastLinkTags,
      passageName,
      restartButtonLabel,
      storyState,
      ...props
    } = this.props;

    const { modalOpen } = this.state;

    return (
      <AppContextConsumerWrapper>
        {({
          config,
          getSoundManager,
          passagesMap,
          plugins,
          store,
        }) => {
          const handleRestart = () => {
            this.restart({
              config,
              getSoundManager,
              passagesMap,
              plugins,
              store,
            });
          };

          return (   
            <Button
              {...props}

              className={classNames(
                builtIns['navigation-button'],
                'navigation-button',
                builtIns['restart-button'],
                'restart-button',
                className,
                { disabled: disabled || modalOpen },
              )}

              onClick={this.toggleModal}
              {...(disabled || modalOpen ? { disabled: true } : {})}
            >
              <span
                className={classNames(
                  builtIns['app-bar-label'],
                  'app-bar-label',
                  builtIns['restart-button-label'],
                  'restart-button-label',
                )}
              >
                {children || 'Restart'}
              </span>

              <Dialog open={modalOpen}>
                <Typography
                  className={classNames(
                    builtIns['app-bar-label'],
                    'app-bar-label',
                    builtIns['restart-button-label'],
                    'restart-button-label',
                  )}

                  variant="h6"
                >
                  {restartButtonLabel ||
                    'Are you sure you want to restart the game? Your progress will be not be saved.'}
                </Typography>

                <Button
                  className={classNames(
                    builtIns['restart-button'],
                    'restart-button',
                    builtIns['restart-confirm-button'],
                    'restart-confirm-button',
                  )}

                  onClick={handleRestart}
                >
                  Confirm
                </Button>

                <Button
                  className={classNames(
                    builtIns['restart-button'],
                    'restart-button',
                    builtIns['restart-cancel-button'],
                    'restart-cancel-button',
                  )}

                  onClick={this.toggleModal}
                >
                  Cancel
                </Button>
              </Dialog>
            </Button>
          );
        }}
      </AppContextConsumerWrapper>
    );
  };

  private readonly toggleModal = () => {
    const { modalOpen: before } = this.state;
    const modalOpen = !before;

    this.setState({ modalOpen });
  };

  private readonly restart = ({
    config,
    getSoundManager,
    passagesMap,
    plugins,
    store,
  }: {
    config: IAcceleratorConfigNormalized,
    passagesMap: IPassagesMap,
    plugins: readonly IPlugin[],
    store: Store<IState>
  } & ISoundManagerAware) => {
    const {
      autoplayerState,
      passageName,
      storyState,
      lastLinkTags,
    } = this.props;

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_INVALID,
    );

    return reset({
      autoplayerState,
      config,
      getSoundManager,
      lastLinkTags,
      passageObject,
      plugins,
      store,
      storyState,
    });
  }
}

export const mapStateToProps: MapStateToProps<
  IRestartButtonStateProps,
  IRestartButtonOwnProps,
  IState
> = ({
  autoplayerState,
  history: {
    present: {
      lastLinkTags,
      passageName,
      storyState,
    },
  },
}) => ({
  autoplayerState,
  passageName,
  storyState,
  lastLinkTags,
});

export const mapDispatchToProps: MapDispatchToProps<
  IRestartButtonDispatchProps,
  IRestartButtonOwnProps
> = (dispatch) => ({ dispatch });

export const RestartButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestartButtonUnconnected);
