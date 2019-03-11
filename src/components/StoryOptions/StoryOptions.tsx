import {
  Button,
} from '../Button/Button';
import {
  BreadcrumbTrail,
} from '../BreadcrumbTrail/BreadcrumbTrail'
import classnames from 'classnames';
import {
  createStoryOptionUpdateAction,
} from '../../actions/creators/createStoryOptionUpdateAction';
import {
  Dialog,
} from '../Dialog/Dialog';
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
} from '../StoryOptionsList/StoryOptionsList';
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
        className={classnames('storyOptionsToggle')}
        onClick={this.toggleModalVisibility}
        {...(open ? { hidden: true } : {})}
      >{
        'Story Options'
      }</Button>

      <Dialog
        className={classnames('soundPanelContentsContainer')}
        dialogActions={<>
          <Button
            className={classnames('soundPanelCloseButton')}
            onClick={this.toggleModalVisibility}
          >
            Close
          </Button>
        </>}
        includeTitle={'Story Options'}
        open={this.state.open}
      >
        <BreadcrumbTrail listComponent={StoryOptionsList}>{
          getStoryOptionsList().map(({
            content: OptionComponent,
            optionPropName,
          }, key) => (
            <OptionComponent
              key={key}
              optionPropName={optionPropName}
              updateOptionValue={this.updateOptionValue.bind(this, optionPropName)}
            />
          ))
        }</BreadcrumbTrail>
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
