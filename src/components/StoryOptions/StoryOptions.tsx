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

export class StoryOptions extends React.PureComponent<
  IStoryOptionsOwnProps & IStoryOptionsDispatchProps,
  IStoryOptionsState
> {
  public readonly state = {
    modalVisible: false,
    trail: [],
  };

  public readonly render = () => {
    const { dispatch } = this.props;

    const {
      modalVisible,
      trail,
    } = this.state;

    const updateOptionValueBound = updateOptionValue.bind(null, dispatch);

    return (
      <>
        <Button
          className={classnames('storyOptionsToggle')}
          onClick={this.toggleModalVisibility}
          {...(modalVisible ? { hidden: true } : {})}
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
          open={modalVisible}
        >
          <BreadcrumbTrail trail={trail} />

          <StoryOptionsList>
            {getStoryOptionsList().map(({
              content: OptionComponentOrList,
              optionPropName,
            }, key) => (
              Array.isArray(OptionComponentOrList)) ?
                <StoryOptionsList
                  key={key}
                  optionPropName={optionPropName}
                >
                  {OptionComponentOrList.map((child, key) => React.cloneElement(
                    child,
                    {
                      key: (child.props as any).key || key,
                      updateOptionValue: updateOptionValueBound,
                    },
                  ))}
                </StoryOptionsList> :
                <OptionComponentOrList
                  key={key}
                  optionPropName={optionPropName}
                  updateOptionValue={updateOptionValueBound}
                />
            )}
          </StoryOptionsList>
        </Dialog>
      </>
    );
  };

  private readonly toggleModalVisibility = () => this.setState({
    modalVisible: !this.state.modalVisible,
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
