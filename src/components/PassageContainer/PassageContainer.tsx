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
  IState,
} from '../../reducers/IState';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';

import * as React from 'react';
import { ActionTypes } from '../../actions/ActionTypes';

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
        title,
        contents,
        tags,
      },

      dispatch,
      setStoryState,
      currentStoryState,
    } = this.props;

    if (Array.isArray(tags) && getTag(tags, BuiltInTags.NoRender)) {
      throw new Error(strings.CANT_RENDER_NORENDER_PASSAGE);
    }

    const propsPassedDown = {
      dispatch,
      setStoryState,
      passageObject: currentPassage,
      storyState: currentStoryState,
    };

    const child = (() => {
      if (React.isValidElement(contents)) {
        /* Do not pass any props to plain elements. */ 
        return contents;
      } else {
        /* Do pass props to components. */
        return React.createElement(contents as any, propsPassedDown);
      }
    })();

    return (
      <div className="passageContainer">
        {title ? <h1>{title}</h1> : null}

        {child}
      </div>
    )
  }
}


export const mapStateToProps: MapStateToProps<IPassageContainerStateProps, IPassageContainerOwnProps, IState> = ({
  currentPassageName,
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
  };
};

export const mapDispatchToProps: MapDispatchToProps<IPassageContainerDispatchProps, IPassageContainerOwnProps & IPassageContainerStateProps> = (reduxDispatch: Dispatch<IAction>, props) => ({
  dispatch(action) {
    return reduxDispatch(action);
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
