import {
  getHeadersList,
} from '../../passages/getHeadersList';
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
  assert,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'There was no contents property found in the header with name %NAME%.',
};

export class PassageHeaders extends React.PureComponent<IPassageContentsContainerOwnProps & IPassageContentsContainerStateProps & IPassageContentsContainerDispatchProps> {
  constructor(props: any) {
    super(props);

    this.restart = this.restart.bind(this);
    this.rewind = this.rewind.bind(this);
  }
  
  public render() {
    const {
      bookmark: bookmark,
      dispatch,
      history,
      lastLinkTags,
      navigateTo,
      passageObject,
      storyState,
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

    const headers: IHeader[] = getHeadersList();
    const headerComponents = headers.map(({ contents }, index) => {
      assert(
        contents,
        strings.COMPONENT_CONSTRUCTOR_NOT_FOUND,
      );

      return React.createElement(
        contents as React.ComponentClass<IPassageProps> | React.SFCFactory<IPassageProps>,
        Object.assign({}, propsPassedDown, { key: index, }),
      );
    });

    return (
      <div className="passageHeaders">
        {headerComponents}
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

export const PassageHeadersConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageHeaders);
