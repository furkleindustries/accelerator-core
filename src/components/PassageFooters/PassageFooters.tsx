import {
  getFootersList,
} from '../../passages/getFootersList';
import {
  IFooter,
} from '../../passages/IFooter';
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

import styles from './PassageFooters.scss';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the footer with name %NAME%.',
};

export class PassageFooters extends React.PureComponent<IPassageContentsContainerStateProps & IPassageContentsContainerDispatchProps> {
  public render() {
    const {
      bookmark: bookmark,
      dispatch,
      history,
      lastLinkTags,
      passageObject,
      storyState,
      navigateTo,
    } = this.props;

    const propsPassedDown: IPassageProps = {
      bookmark,
      dispatch,
      lastLinkTags,
      navigateTo,
      passageObject,
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

    const footers: IFooter[] = getFootersList();
    const footerComponents = footers.map(({ contents }, index) => {
      const safeContents = assertValid<React.ComponentClass<IPassageProps> | React.SFCFactory<IPassageProps>>(
        contents,
        strings.COMPONENT_CONSTRUCTOR_NOT_FOUND,
      );

      return React.createElement(
        safeContents,
        {
          ...propsPassedDown,
          key: index,
        },
      );
    });

    return (
      <div className={`${styles.passageFooters} passageFooters`}>
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
