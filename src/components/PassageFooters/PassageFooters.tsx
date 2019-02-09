import {
  getFootersList,
} from '../../passages/getFootersList';
import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
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
import { IManager } from 'sound-manager';
import { getSoundManagerContext } from '../../state/getSoundManagerContext';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the footer with name %NAME%.',
};

export class PassageFooters extends React.PureComponent<
  IPassageContentsContainerOwnProps &
  IPassageContentsContainerStateProps &
  IPassageContentsContainerDispatchProps
> {
  public static contextType = getSoundManagerContext();

  public render() {
    const {
      bookmark,
      dispatch,
      history,
      lastLinkTags,
      passageObject,
      storyState,
      navigateTo,
    } = this.props;

    const { soundManager }: { soundManager: IManager } = this.context;
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
          updatedStateProps,
        });
      },
    };

    const footerComponents = getFootersList().map(({ contents }, index) => {
      type temp = React.ComponentClass<IPassageProps> | React.SFC<IPassageProps>;

      const SafeContents = assertValid<temp>(
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
