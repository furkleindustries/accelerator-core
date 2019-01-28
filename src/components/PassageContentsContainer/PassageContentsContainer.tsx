import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
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
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  COMPONENT_NOT_FOUND:
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

    const safeContents = assertValid<React.ComponentClass<IPassageProps> | React.SFC<IPassageProps>>(
      contents,
      strings.COMPONENT_NOT_FOUND,
    );

    assert(
      Array.isArray(currentPassageObject.tags) &&
        !getTag(currentPassageObject.tags, BuiltInTags.NoRender),
      strings.CANT_RENDER_NORENDER_PASSAGE,
    );

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
      safeContents,
      propsPassedDown,
    );
  }
}

export const mapStateToProps: MapStateToProps<IPassageContentsContainerStateProps, IPassageContentsContainerOwnProps, IState> = ({
  history: {
    present: {
      currentPassageName,
      passage: currentPassageObject,
      storyState: currentStoryState,
      lastLinkTags,
    },
  },
}) =>
{
  assert(
    currentPassageObject,
    strings.PASSAGE_NOT_FOUND.replace('%NAME%', currentPassageName),
  );

  return {
    currentPassageObject,
    currentStoryState,
    lastLinkTags,
  };
};

export const mapDispatchToProps: MapDispatchToProps<IPassageContentsContainerDispatchProps, IPassageContentsContainerOwnProps & IPassageContentsContainerStateProps> = (
  dispatch: Dispatch<IAction>,
  {
    currentPassageObject,
    currentStoryState,
    lastLinkTags,
  },
) => ({
  dispatch,

  navigateTo(passageName, tags?) {
    return navigate({
      dispatch,
      passageName,
      tags: tags || [],
    });
  },

  restart() {
    return reset({
      currentPassageObject,
      dispatch,
      lastLinkTags,
      storyState: currentStoryState,
    });
  },
});

export const PassageContentsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageContentsContainer);
