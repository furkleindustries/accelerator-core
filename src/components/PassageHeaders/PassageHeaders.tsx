import {
  getHeadersList,
} from '../../passages/getHeadersList';
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

// @ts-ignore
import _styles from './PassageHeaders.scss';
const styles = _styles || {};

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the header with name %NAME%.',
};

export class PassageHeaders extends React.PureComponent<IPassageContentsContainerOwnProps & IPassageContentsContainerStateProps & IPassageContentsContainerDispatchProps> {
  public render() {
    const {
      currentPassageObject,
      currentStoryState,
      dispatch,
      lastLinkTags,
      navigateTo,
      restart,
    } = this.props;

    const {
      store,
    }: {
      store: Store<IState>,
    } = this.context;

    const propsPassedDown: IPassageProps = {
      dispatch,
      lastLinkTags,
      navigateTo,
      restart,
      storyState: currentStoryState,
      passageObject: currentPassageObject,
      
      setStoryState(updatedStateProps) {
        mutateCurrentStoryStateInstanceWithPluginExecution(updatedStateProps, store);
      },
    };

    const headers: IHeader[] = getHeadersList();
    const headerComponents = headers.map((header, index) => {
      const contents = header.contents;
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
      <div className={`${styles.passageHeaders} passageHeaders`}>
        {headerComponents}
      </div>
    );
  }
}

export const PassageHeadersConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageHeaders);
