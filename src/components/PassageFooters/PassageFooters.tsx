import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IFooter,
} from '../../passages/IFooter';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IPassageContentsContainerDispatchProps,
} from '../PassageContentsContainer/IPassageContentsContainerDispatchProps';
import {
  IPassageContentsContainerOwnProps,
} from '../PassageContentsContainer/IPassageContentsContainerOwnProps';
import {
  IPassageContentsContainerStateProps,
} from '../PassageContentsContainer/IPassageContentsContainerStateProps';
import {
  mutateCurrentStoryStateInstanceWithPluginExecution,
} from '../../state/mutateCurrentStoryStateInstanceWithPluginExecution';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../PassageContentsContainer/PassageContentsContainer';
import {
  connect,
} from 'react-redux';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the footer with name %NAME%.',
};

export class PassageFooters extends React.PureComponent<
  { footers: IFooter[] } &
  IPassageContentsContainerOwnProps &
  IPassageContentsContainerStateProps &
  IPassageContentsContainerDispatchProps
> {
  public render() {
    const {
      bookmark,
      dispatch,
      footers,
      history,
      lastLinkTags,
      navigateTo,
      passageObject,
      plugins,
      soundManager,
      storyState,
    } = this.props;

    const propsPassedDown: IPassageProps = {
      bookmark,
      dispatch,
      lastLinkTags,
      navigateTo,
      passageObject,
      soundManager,
      storyState,
      restart: this.restart,
      rewind: this.rewind,
      setStoryState(updatedStateProps) {
        mutateCurrentStoryStateInstanceWithPluginExecution({
          dispatch,
          history,
          passageObject,
          plugins,
          updatedStateProps,
        });
      },
    };

    const footerComponents = footers.map(({ contents }, index) => {
      const SafeContents = assertValid<React.ComponentType<IPassageProps>>(
        contents,
        strings.COMPONENT_CONSTRUCTOR_NOT_FOUND,
      );

      return (
        <SafeContents
          key={index}
          {...propsPassedDown}
        />
      );
    });

    return (
      <div className="passageFooters">
        {footerComponents}
      </div>
    );
  }

  private restart() {
    const {
      lastLinkTags,
      restart,
      passageObject: currentPassageObject,
      storyState: currentStoryState,
    } = this.props;

    restart(currentPassageObject, currentStoryState, lastLinkTags);
  }

  private rewind(filter?: HistoryFilter) {
    const {
      rewind,
      history: {
        present,
        past,
      },
    } = this.props;

    rewind(present, past, filter);
  }
}

export const PassageFootersConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageFooters);
