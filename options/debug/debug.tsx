import {
  Button,
} from '../../bundles/componentsBundle';
import classNames from 'classnames';
import {
  createDebugAction,
} from '../../src/actions/creators/createDebugAction';
import {
  IDebugOptionDispatchProps,
} from './IDebugOptionDispatchProps';
import {
  IDebugOptionStateProps,
} from './IDebugOptionStateProps';
import {
  IStoryOptionComponentOwnProps,
} from '../../src/storyOptions/IStoryOptionComponentOwnProps';
import {
  IState,
} from '../../src/state/IState';
import {
  IStoryOption,
} from '../../src/storyOptions/IStoryOption';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';

import * as React from 'react';

import styles from '../../plugins/menu/index.less';

class Option extends React.PureComponent<
  IStoryOptionComponentOwnProps &
    IDebugOptionStateProps &
    IDebugOptionDispatchProps
> {
  public readonly render = () => {
    const {
      className,
      clickOption: unusedClickOption,
      debug,
      dispatch: unusedDispatch,
      ...props
    } = this.props;

    return (
      <div
        {...props}

        className={classNames(
          styles['story-options-list-item'],
          'story-options-list-item',
        )}

        role="group"
      >
        <Button
          className={classNames(
            styles['story-options-list-open-button'],
            'story-options-list-open-button',
          )}

          onClick={this.toggleDebug}
        >
          Switch debug mode {debug ? 'off' : 'on'}
        </Button>
      </div>
    );
  };

  public readonly toggleDebug = () => (
    this.props.dispatch(createDebugAction(!this.props.debug))
  );
};

export const mapStateToProps: MapStateToProps<
  IDebugOptionStateProps,
  IStoryOptionComponentOwnProps,
  IState
> = ({ debug }) => ({ debug });

export const mapDispatchToProps: MapDispatchToProps<
  IDebugOptionDispatchProps,
  IStoryOptionComponentOwnProps
> = (dispatch) => ({ dispatch });

const OptionConnected = connect(mapStateToProps, mapDispatchToProps)(Option);

const option: IStoryOption = {
  content: OptionConnected,
  name: 'debug-option',
  precedence: Number.MAX_SAFE_INTEGER,
};

export default option;
