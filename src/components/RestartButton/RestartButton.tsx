import {
  Button,
} from '../Button/Button';
import classnames from 'classnames';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../../context/getPluginsContext';
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

const {
  Consumer: PassagesMapAndStartPassageNameContextConsumer,
} = getPassagesMapAndStartPassageNameContext();

const { Consumer: PluginsContextConsumer } = getPluginsContext();

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
      <PassagesMapAndStartPassageNameContextConsumer>
        {({ passagesMap }) => (
          <PluginsContextConsumer>
            {({ plugins }) => {
              const boundRestart = this.restart.bind(
                this,
                passagesMap,
                plugins,
              );

              return (
                <Button
                  className={classnames(
                    'resetButton',
                    'navigationButton',
                    className
                  )}
                  onClick={boundRestart}
                >
                  {children}
                </Button>
              );
            }}
          </PluginsContextConsumer>
        )}
      </PassagesMapAndStartPassageNameContextConsumer>
    );
  }

  private restart(passagesMap: IPassagesMap, plugins: IPlugin[]) {
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
      passageName: passageName,
      lastLinkTags,
      storyState,
    },
  },
}) =>
({
  passageName,
  storyState,
  lastLinkTags,
});

export const mapDispatchToProps: MapDispatchToProps<IRestartButtonDispatchProps, IRestartButtonOwnProps> = (dispatch) => ({
  dispatch,
});

export const RestartButton = connect(mapStateToProps, mapDispatchToProps)(RestartButtonUnconnected);
