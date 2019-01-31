import {
  getFootersList,
} from '../../passages/getFootersList';
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
  IState,
} from '../../state/IState';
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
  Store,
} from 'redux';

import * as React from 'react';

import styles from './PassageFooters.scss';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the footer with name %NAME%.',
};

export class PassageFooters extends React.PureComponent<IPassageContentsContainerOwnProps & IPassageContentsContainerStateProps & IPassageContentsContainerDispatchProps> {
  public render() {
    const {
      bookmark,
      passageObject,
      storyState,
      dispatch,
      lastLinkTags,
      navigateTo,
      restart,
      rewind,
    } = this.props;

    const { store }: { store: Store<IState> } = this.context;

    const propsPassedDown: IPassageProps = {
      bookmark,
      dispatch,
      lastLinkTags,
      navigateTo,
      restart,
      rewind,
      passageObject,
      storyState,

      setStoryState(updatedStateProps) {
        mutateCurrentStoryStateInstanceWithPluginExecution(updatedStateProps, store);
      },
    };

    const footers: IFooter[] = getFootersList();
    const footerComponents = footers.map((footer, index) => {
      const contents = footer.contents;
      if (!contents) {
        const errStr = strings.COMPONENT_CONSTRUCTOR_NOT_FOUND;
        throw new Error(errStr);
      }

      return React.createElement(
        contents as React.ComponentClass<IPassageProps> | React.SFCFactory<IPassageProps>,
        Object.assign({}, propsPassedDown, { key: index, }),
      );
    });

    return (
      <div className={`${styles.passageFooters} passageFooters`}>
        {footerComponents}
      </div>
    );
  }
}

export const PassageFootersConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageFooters);
