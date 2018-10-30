import {
  ActionTypes,
} from '../../actions/ActionTypes';
import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  getTag,
} from '../../tags/getTag';
import {
  IAction,
} from '../../actions/IAction';
import {
  IPassageContainerDispatchProps,
} from './IPassageContainerDispatchProps';
import {
  IPassageContainerOwnProps,
} from './IPassageContainerOwnProps';
import {
  IPassageContainerStateProps,
} from './IPassageContainerStateProps';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IState,
} from '../../reducers/IState';
import {
  navigate,
} from '../../state/navigate';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';

import * as React from 'react';

// @ts-ignore
import _styles from './PassageContainer.scss';
const styles = _styles || {};

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
  
    CANT_RENDER_NORENDER_PASSAGE:
    'A passage with the tag "noRender" was passed to PassageContainer. ' +
    'These passages cannot be rendered and should be used solely for ' +
    'exporting reusable content.',
};

export class PassageContainer extends React.PureComponent<IPassageContainerOwnProps & IPassageContainerStateProps & IPassageContainerDispatchProps> {
  public render() {
    const {
      currentPassage,
      currentPassage: {
        contents,
      },

      dispatch,
      lastLinkTags,
      navigateTo,
      setStoryState,
      currentStoryState,
    } = this.props;

    if (Array.isArray(currentPassage.tags) &&
        getTag(currentPassage.tags, BuiltInTags.NoRender))
    {
      throw new Error(strings.CANT_RENDER_NORENDER_PASSAGE);
    }

    const propsPassedDown: IPassageProps = {
      dispatch,
      lastLinkTags,
      navigateTo,
      setStoryState,
      passageObject: currentPassage,
      storyState: currentStoryState,
    };

    const child = React.createElement(
      contents as React.ComponentClass<IPassageProps> | React.SFCFactory<IPassageProps>,
      propsPassedDown,
    );

    return (
      <div className={`${styles.passageContainer} passageContainer`}>
        {child}
      </div>
    );
  }
}


export const mapStateToProps: MapStateToProps<IPassageContainerStateProps, IPassageContainerOwnProps, IState> = ({
  currentPassageName,
  passageHistory,
  passages,
  storyStateHistory,
}) => {
  if (!(currentPassageName in passages)) {
    const errStr = strings.PASSAGE_NOT_FOUND
      .replace('%NAME%', currentPassageName);

    throw new Error(errStr);
  }

  return {
    currentPassage: passages[currentPassageName],
    currentStoryState: storyStateHistory[0],
    lastLinkTags: passageHistory[0].linkTags,
    passages,
  };
};

export const mapDispatchToProps: MapDispatchToProps<IPassageContainerDispatchProps, IPassageContainerOwnProps & IPassageContainerStateProps> = (reduxDispatch: Dispatch<IAction>, props) => ({
  dispatch(action) {
    return reduxDispatch(action);
  },

  navigateTo(passageName, tags?) {
    navigate({
      dispatch: reduxDispatch,
      passage: props.passages[passageName],
      tags: tags || [],
    });
  },

  setStoryState(updatedState) {
    const action = createStoryStateAction(
      ActionTypes.StoryStateUpdate,
      updatedState
    );

    return reduxDispatch(action);
  },
})

export const PassageContainerConnected = connect(mapStateToProps, mapDispatchToProps)(PassageContainer);

export default PassageContainerConnected;
