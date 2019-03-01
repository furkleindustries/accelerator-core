import {
  getSoundManagerContext,
} from '../../context/getSoundManagerContext';
import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IHeader,
} from '../../passages/IHeader';
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

import styles from './PassageHeaders.scss';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the header with name %NAME%.',
};

export class PassageHeaders extends React.PureComponent<
  { headers: IHeader[] } &
  IPassageContentsContainerOwnProps &
  IPassageContentsContainerStateProps &
  IPassageContentsContainerDispatchProps
> {
  public static contextType = getSoundManagerContext();

  public render = () => {
    const {
      bookmark,
      dispatch,
      headers,
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

    const headerComponents = headers.map(({ contents }, index) => {
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
      <div className={styles.passageHeaders}>
        {headerComponents}
      </div>
    );
  };

  private restart = () => {
    const {
      lastLinkTags,
      restart,
      passageObject: currentPassageObject,
      storyState: currentStoryState,
    } = this.props;

    restart(currentPassageObject, currentStoryState, lastLinkTags);
  };

  private rewind = (filter?: HistoryFilter) => {
    const {
      rewind,
      history: {
        present,
        past,
      },
    } = this.props;

    rewind(present, past, filter);
  };
}

export const PassageHeadersConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageHeaders);
