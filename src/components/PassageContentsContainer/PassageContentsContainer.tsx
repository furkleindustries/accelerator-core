import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
import {
  getPassagesMap,
} from '../../passages/getPassagesMap';
import {
  getTag,
} from '../../tags/getTag';
import {
  IAction,
} from '../../actions/IAction';
import {
  IPassageContentsContainerDispatchProps,
} from './IPassageContentsContainerDispatchProps';
import {
  IPassageContentsContainerOwnProps,
} from './IPassageContentsContainerOwnProps';
import {
  IPassageContentsContainerStateProps,
} from './IPassageContentsContainerStateProps';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IState,
} from '../../state/IState';
import {
  mutateCurrentStoryStateInstanceWithPluginExecution,
} from '../../state/mutateCurrentStoryStateInstanceWithPluginExecution';
import {
  navigate,
} from '../../state/navigate';
import {
  object as ObjectProp,
} from 'prop-types';
import {
  connect, MapStateToProps, MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
  Store,
} from 'redux';
import {
  reset,
} from '../../state/reset';

import * as React from 'react';

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'The contents property of the passage object passed to PassageContainer ' +
    'was not found.',

  CANT_RENDER_NORENDER_PASSAGE:
    'A passage with the tag "noRender" was passed to PassageContainer. ' +
    'These passages cannot be rendered and should be used solely for ' +
    'exporting reusable content.',
  
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

export class PassageContentsContainer extends React.PureComponent<IPassageContentsContainerOwnProps & IPassageContentsContainerDispatchProps & IPassageContentsContainerStateProps> {
  public static contextTypes = {
    store: ObjectProp,
  };

  public render() {
    const {
      currentPassageObject,
      currentPassageObject: {
        contents,
      },

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

    if (!contents) {
      throw new Error(strings.COMPONENT_CONSTRUCTOR_NOT_FOUND);
    } else if (Array.isArray(currentPassageObject.tags) &&
               getTag(currentPassageObject.tags, BuiltInTags.NoRender))
    {
      throw new Error(strings.CANT_RENDER_NORENDER_PASSAGE);
    }

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

    return React.createElement(
      contents as React.ComponentClass<IPassageProps> | React.SFCFactory<IPassageProps>,
      propsPassedDown
    );
  }
}

export const mapStateToProps: MapStateToProps<IPassageContentsContainerStateProps, IPassageContentsContainerOwnProps, IState> = ({
  history: {
    present: {
      passage,   
      storyState,
      lastLinkTags,
    },
  },
}) => {
  const {
    passagesMap,
  } = getPassagesMap();

  const currentPassageName = passage.name;
  if (!(currentPassageName in passagesMap)) {
    const errStr = strings.PASSAGE_NOT_FOUND
      .replace('%NAME%', currentPassageName);

    throw new Error(errStr);
  }

  return {
    lastLinkTags,
    currentPassageObject: passagesMap[currentPassageName],
    currentStoryState: storyState,
    passages: passagesMap,
  };
};

export const mapDispatchToProps: MapDispatchToProps<IPassageContentsContainerDispatchProps, IPassageContentsContainerOwnProps & IPassageContentsContainerStateProps> = (dispatch: Dispatch<IAction>, props) => ({
  dispatch,

  navigateTo(passageName, tags?) {
    navigate({
      dispatch,
      passageName,
      tags: tags || [],
    });
  },

  restart() {
    reset({
      dispatch,
      currentPassageObject: props.currentPassageObject,
      storyState: props.currentStoryState,
      lastLinkTags: props.lastLinkTags,
    });
  },
});

export const PassageContentsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageContentsContainer);
