import {
  Button,
} from '../Button/Button';
import {
  BreadcrumbTrail,
} from '../BreadcrumbTrail/BreadcrumbTrail'
import classnames from 'classnames';
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
import {
  updateOptionValue,
} from './updateOptionValue';

import * as React from 'react';
import { IBreadcrumbItem } from '../Breadcrumb/IBreadcrumbItem';

export class StoryOptions extends React.PureComponent<
  IStoryOptionsOwnProps & IStoryOptionsDispatchProps,
  IStoryOptionsState
> {
  public readonly state = {
    open: false,
    trail: [
      { name: 'Story Options' },
    ],
  };

  public readonly render = () => {
    const { dispatch } = this.props;

    const {
      open,
      trail,
    } = this.state;

    const updateOptionValueBound = updateOptionValue.bind(null, dispatch);

    return (
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
          dialogActions={
            <>
              <Button
                className={classnames('soundPanelCloseButton')}
                onClick={this.toggleModalVisibility}
              >
                Close
              </Button>,
            </>
          }
          includeTitle={'Story Options'}
          open={open}
        >
          <BreadcrumbTrail
            listComponent={StoryOptionsList}
            clickBreadcrumb={this.clickBreadcrumb}
            trail={trail}
          >
            {getStoryOptionsList().map(({
              content: OptionComponent,
              optionPropName,
            }, key) => (
              <OptionComponent
                key={key}
                optionPropName={optionPropName}
                updateOptionValue={updateOptionValueBound}
              />
            ))}
          </BreadcrumbTrail>
        </Dialog>
      </>
    );
  };

  private readonly clickBreadcrumb = (index: number) => this.setState({
    trail: this.state.trail.slice(0, index + 1),
  });

  private readonly addBreadcrumbState = (crumb: IBreadcrumbItem) => this.setState({
    trail: this.state.trail.concat([ crumb ]),
  });

  private readonly toggleModalVisibility = () => this.setState({
    open: !this.state.open,
  });
};

export const mapDispatchToProps: MapDispatchToProps<
  IStoryOptionsDispatchProps,
  {}
> = (dispatch) => ({ dispatch });

export const StoryOptionsConnected = connect(
  null,
  mapDispatchToProps,
)(StoryOptions);
