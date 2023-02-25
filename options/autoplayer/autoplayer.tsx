import {
  Button,
  StoryOptionsList,
  Typography,
} from '../../bundles/componentsBundle';
import classNames from 'classnames';
import {
  createAutoplayerStateUpdateAction,
} from '../../src/actions/creators/createAutoplayerStateUpdateAction';
import {
  IAutoplayerOptionDispatchProps,
} from './IAutoplayerOptionDispatchProps';
import {
  IAutoplayerOptionStateProps,
} from './IAutoplayerOptionStateProps';
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

import styles from './autoplayer.less';

class Option extends React.PureComponent<
  IStoryOptionComponentOwnProps &
    IAutoplayerOptionStateProps &
    IAutoplayerOptionDispatchProps
> {
  public readonly render = () => {
    const {
      autoplayerState: {
        active,
        baseDelayTime,
        scroll,
      },

      className,
      clickOption,
      crumb,
      ...props
    } = this.props;

    return (
      <StoryOptionsList
        {...props}

        className={classNames(
          styles['autoplayer-panel-container'],
          'autoplayer-panel-container',
          className,
        )}

        clickOption={clickOption}
        crumb={crumb}
        role="treeitem"
        title="Autoplayer Options"
      >
        <div
          className={classNames(
            styles['autoplayer-option'],
            'autoplayer-option',
          )}

          role="group"
        >
          <div
            className={classNames(
              styles['autoplayer-control-container'],
              'autoplayer-control-container',
            )}

            role="group"
          >
            <Button
              className={classNames(
                styles['autoplayer-button'],
                'autoplayer-button',
              )}

              onClick={this.toggleAutoplayerActive}
              role="toggle"
              aria-pressed={active}
            >
              Turn Autoplayer {active ? 'off' : 'on'}
            </Button>
          </div>

          <div
            className={classNames(
              styles['autoplayer-control-container'],
              'autoplayer-control-container',
            )}

            role="group"
          >
            <Button
              className={classNames(
                styles['autoplayer-button'],
                'autoplayer-button',
              )}

              onClick={this.toggleAutoplayerScroll}
              role="toggle"
              aria-pressed={scroll}
            >
              Autoplayer scroll {scroll ? 'off' : 'on'}
            </Button>
          </div>

          <div
            className={classNames(
              styles['autoplayer-control-container'],
              'autoplayer-control-container',
            )}

            role="group"
          >
            <Typography
              className={classNames(
                styles['autoplayer-label'],
                'autoplayer-label',
              )}

              component="label"
              htmlFor="autoplayer-base-delay-input"
            >
              Adjust base autochoice delay time
            </Typography>

            <input
              className={classNames(
                styles['autoplayer-input'],
                'autoplayer-input',
              )}

              defaultValue={baseDelayTime}
              id="autoplayer-base-delay-input"
              min={10000}
              max={60000}
              name="Autoplayer delay scale"
              onChange={this.setAutoplayerDelayScale}
              step={100}
              tabIndex={0}
              title="Autoplayer delay scale"
              type="range"
            />
          </div>
        </div>
      </StoryOptionsList>
    );
  };

  public readonly toggleAutoplayerActive = () => (
    this.props.dispatch(createAutoplayerStateUpdateAction({
      ...this.props.autoplayerState,
      active: !this.props.autoplayerState.active,
    }))
  );

  public readonly setAutoplayerDelayScale = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { valueAsNumber },
    } = ev;

    return this.props.dispatch(createAutoplayerStateUpdateAction({
      ...this.props.autoplayerState,
      baseDelayTime: valueAsNumber,
    }));
  };

  public readonly toggleAutoplayerScroll = () => (
    this.props.dispatch(createAutoplayerStateUpdateAction({
      ...this.props.autoplayerState,
      scroll: !this.props.autoplayerState.scroll,
    }))
  );
};

export const mapStateToProps: MapStateToProps<
  IAutoplayerOptionStateProps,
  IStoryOptionComponentOwnProps,
  IState
> = ({ autoplayerState }) => ({ autoplayerState });

export const mapDispatchToProps: MapDispatchToProps<
  IAutoplayerOptionDispatchProps,
  IStoryOptionComponentOwnProps
> = (dispatch) => ({ dispatch });

const OptionConnected = connect(mapStateToProps, mapDispatchToProps)(Option);

const option: IStoryOption = {
  content: OptionConnected,
  name: 'autoplayer-option',
  precedence: 3,
};

export default option;
