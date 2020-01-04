import {
  Button,
} from '../Button';
import {
  BreadcrumbTrail,
} from '../BreadcrumbTrail'
import classNames from 'classnames';
import {
  createStoryOptionUpdateAction,
} from '../../actions/creators/createStoryOptionUpdateAction';
import {
  Dialog,
} from '../Dialog';
import {
  getStoryOptionsList,
} from '../../storyOptions/getStoryOptionsList';
import {
  IStoryOptionsDispatchProps,
} from './IStoryOptionsDispatchProps';
import {
  IStoryOptionsOwnProps,
} from './IStoryOptionsOwnProps';
import {
  IStoryOptionsState,
} from './IStoryOptionsState';
import {
  StoryOptionsList,
} from '../StoryOptionsList';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';

import * as React from 'react';

export class StoryOptions extends React.PureComponent<
  IStoryOptionsOwnProps & IStoryOptionsDispatchProps,
  IStoryOptionsState
> {
  public readonly state: IStoryOptionsState = { open: false };

  public readonly render = () => (
    <>
      <Button
        className={classNames('storyOptionsToggle')}
        onClick={this.toggleModalVisibility}
        {...(open ? { hidden: true } : {})}
      >{
        'Story Options'
      }</Button>

      <Dialog
        className={classNames('soundPanelContentsContainer')}
        dialogActions={
          <>
            <Button
              className={classNames('soundPanelCloseButton')}
              onClick={this.toggleModalVisibility}
            >
              Close
            </Button>
          </>
        }

        includeTitle="Story Options"
        open={this.state.open!}
      >
        <BreadcrumbTrail listComponent={StoryOptionsList}>
          {({
              getBreadcrumbProps,
              treeSelector,
              visibilityTree,
            }) => (
              getStoryOptionsList().map(({ content: OptionComponent }, key) => (
                <OptionComponent
                  key={key}
                  getBreadcrumbProps={getBreadcrumbProps}
                  treeSelector={treeSelector}
                  updateOptionValue={this.updateOptionValue}
                  visibilityTree={visibilityTree}
                />
              ))
            )}
        </BreadcrumbTrail>
      </Dialog>
    </>
  );

  private readonly toggleModalVisibility = () => this.setState({
    open: !this.state.open,
  });

  private readonly updateOptionValue = (
    propName: string,
    value: any,
  ) => this.props.dispatch(createStoryOptionUpdateAction(propName, value));
}

export const mapDispatchToProps: MapDispatchToProps<
  IStoryOptionsDispatchProps,
  {}
> = (dispatch) => ({ dispatch });

export const StoryOptionsConnected = connect(
  null,
  mapDispatchToProps,
)(StoryOptions);
