import classNames from 'classnames';
import {
  Article,
  Button,
  Typography,
} from '../../../bundles/componentsBundle';
import {
  DebugPassageSelector,
} from './DebugPassageSelector';
import {
  DebugInspector,
} from './DebugInspector';
import {
  IDebugControllerOwnProps,
} from './IDebugControllerOwnProps';
import {
  IDebugControllerState,
} from './IDebugControllerState';
import {
  IDebugControllerStateProps,
} from './IDebugControllerStateProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  v4,
} from 'uuid';

import * as React from 'react';

import styles from '../../../plugins/debug/index.less';

export class DebugControllerUnconnected extends React.PureComponent<
  IDebugControllerOwnProps & IDebugControllerStateProps,
  IDebugControllerState
> {
  private debugButtonId = `debug-button-${v4()}`;
  private navigationId = 'debug-passage-navigation-selector';

  public readonly state: IDebugControllerState = { expanded: false };

  public readonly render = () => {
    const {
      debug,
      id,
      newGameCounter,
    } = this.props;

    const { expanded } = this.state;

    return (
      <Article
        className={classNames(
          styles['debug-container'],
          'debug-container',
          this.props.className,
          { [styles['collapsed']]: !expanded },
        )}

        hidden={!debug && newGameCounter < 2}
        role="dialog"
      >
        <Button
          className={classNames(
            styles['debug-container-close'],
            'debug-container-close',
          )}

          aria-labelledby={this.debugButtonId}
          role="switch"
          aria-roledescription="Debug menu toggle"
          aria-expanded={expanded}
          aria-pressed={expanded}
          id={id || 'debug-container-close'}
          onClick={this.toggleMenuVisibility}
          tabIndex={-1}
          title="Debug menu toggle"
        >
          <Typography role="presentation">
            {expanded ? '☰' : '☷'}
          </Typography>

          <Typography
            component="label"
            id={this.debugButtonId}
            style={{
              position: 'absolute',
              display: 'block',
              height: 0,
              opacity: 0,
            }}
          >
            Debug menu toggle
          </Typography>
        </Button>

        <div
          className={classNames(
            styles['debug-content-container'],
            'debug-content-container',
            { [styles['collapsed']]: !expanded },
          )}

          role="article"
        >
          <div
            className={classNames(
              styles['debug-passage-navigation-container'],
              'debug-passage-navigation-container',
            )}

            role="navigation"
          >
            <Typography
              className={classNames(
                styles['debug-passage-navigation-label'],
                'debug-passage-navigation-label',
              )}

              component="label"
              htmlFor={this.navigationId}
            >
              Navigate to passage:
            </Typography>

            <DebugPassageSelector
              closeMenu={this.toggleMenuVisibility}
              id={this.navigationId}
            />
          </div>
  
          <div
            className={classNames(
              styles['debug-state-inspector-container'],
              'debug-state-inspector-container',
            )}

            role="group"
          >
            <DebugInspector />
          </div>
        </div>
      </Article>
    );
  };

  public readonly componentDidMount = () => {
    document.addEventListener('keydown', this.keypressHandler);
  };

  public readonly componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keypressHandler);
  };

  public readonly toggleMenuVisibility = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  public readonly keypressHandler = (e: KeyboardEvent) => {
    if (this.state.expanded && e.key === 'Escape') {
      this.setState({ expanded: false });
    }
  };
}

export const mapStateToProps: MapStateToProps<
  IDebugControllerStateProps,
  IDebugControllerOwnProps,
  IState
> = ({
  debug,
  history: {
    present: {
      storyState: { XLR8R_NEW_GAME },
    }
  }
}) => ({
  debug,
  newGameCounter: Number(XLR8R_NEW_GAME) || 0,
});

export const DebugController = connect(
  mapStateToProps,
)(DebugControllerUnconnected);
