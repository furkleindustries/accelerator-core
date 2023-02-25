import {
  BreadcrumbTrail,
} from '../BreadcrumbTrail';
import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  createStoryOptionsDialogVisibleAction,
} from '../../actions/creators/createStoryOptionsDialogVisibleAction';
import {
  Dialog,
} from '../Dialog';
import {
  getStoryOptionsList,
} from '../../storyOptions/getStoryOptionsList';
import {
  IState,
} from '../../state/IState';
import {
  IStoryOptionsDispatchProps,
} from './IStoryOptionsDispatchProps';
import {
  IStoryOptionsOwnProps,
} from './IStoryOptionsOwnProps';
import {
  IStoryOptionsStateProps,
} from './IStoryOptionsStateProps';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  StoryOptionsList,
} from '../StoryOptionsList';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';
import styles from '../../../plugins/menu/index.less';

export class StoryOptionsUnconnected extends React.PureComponent<
  IStoryOptionsOwnProps &
    IStoryOptionsStateProps &
    IStoryOptionsDispatchProps
> {
  private storyOptions = [ ...getStoryOptionsList() ];

  public readonly render = () => (
    <>
      <Button
        className={classNames(
          styles['story-options-toggle'],
          'story-options-toggle',
          builtIns['navigation-button'],
          'navigation-button',
          this.props.className,
        )}

        role="toggle"
        aria-pressed={this.props.dialogOpen}
        onClick={this.toggleDialogVisibility}
      >
        <span
          className={classNames(
            builtIns['app-bar-label'],
            'app-bar-label',
            builtIns['navigation-button-label'],
            'navigation-button-label',
            builtIns['story-options-label'],
            'story-options-label',
          )}
        >
          Story Options
        </span>
      </Button>

      <Dialog
        className={classNames(
          styles['story-options-contents-container'],
          'story-options-contents-container',
        )}

        dialogActions={<>
          <Button
            className={classNames(
              styles['story-options-close-button'],
              'story-options-close-button',
            )}

            onClick={this.toggleDialogVisibility}
            role="toggle"
            aria-pressed={this.props.dialogOpen}
          >
            Close
          </Button>
        </>}

        fullWidth={true}
        includeTitle="Story Options"
        onBackdropClick={this.toggleDialogVisibility}
        open={this.props.dialogOpen}
      >
        <BreadcrumbTrail
          ListComponent={StoryOptionsList}
          options={this.storyOptions}
        />
      </Dialog>
    </>
  );

  public readonly componentDidMount = () => {
    document.addEventListener('keyup', this.keyListener);
  };

  public readonly componentWillUnmount = () => {
    document.removeEventListener('keyup', this.keyListener);
  };

  public readonly setDialogOpen = (value: boolean) => (
    this.props.dispatch(createStoryOptionsDialogVisibleAction(value))
  );

  public readonly toggleDialogVisibility = () => (
    this.setDialogOpen(!this.props.dialogOpen)
  );

  public readonly keyListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.setDialogOpen(false);
    }
  };
}

export const mapStateToProps: MapStateToProps<
  IStoryOptionsStateProps,
  IStoryOptionsOwnProps,
  IState
> = ({ storyOptionsDialogVisible }) => ({
  dialogOpen: storyOptionsDialogVisible,
});

export const mapDispatchToProps: MapDispatchToProps<
  IStoryOptionsDispatchProps,
  IStoryOptionsOwnProps
> = (dispatch) => ({ dispatch });

export const StoryOptions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryOptionsUnconnected);
