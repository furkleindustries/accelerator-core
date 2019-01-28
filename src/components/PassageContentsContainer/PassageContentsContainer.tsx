import {
  bookmark,
} from '../../state/bookmark';
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
  IHistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IPassage,
} from '../../passages/IPassage';
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
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
  Store,
} from 'redux';
import {
  reset,
} from '../../state/reset';
import {
  rewind,
} from '../../state/rewind';
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

export class PassageContentsContainer extends React.PureComponent<
  IPassageContentsContainerOwnProps &
  IPassageContentsContainerDispatchProps &
  IPassageContentsContainerStateProps
>
{
  public static contextTypes = {
    store: ObjectProp,
  };

  public render() {
    const {
      bookmark,
      passageObject: currentPassageObject,
      passageObject: {
        contents,
      },

      storyState: currentStoryState,
      dispatch,
      lastLinkTags,
      navigateTo,
      restart,
      rewind,
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
      bookmark,
      dispatch,
      lastLinkTags,
      navigateTo,
      restart,
      rewind,
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
  history,
  history: {
    present: {
      currentPassageName: name,
      storyState,
      lastLinkTags,
    },
  },
}) =>
{
  const passageObject = assertValid<IPassage>(
    getPassagesMap().passagesMap[name],
    strings.PASSAGE_NOT_FOUND.replace('%NAME%', name),
  );

  return {
    history,
    lastLinkTags,
    passageObject,
    storyState,
  };
};

export const mapDispatchToProps: MapDispatchToProps<IPassageContentsContainerDispatchProps, IPassageContentsContainerOwnProps & IPassageContentsContainerStateProps> = (
  dispatch: Dispatch<IAction>,
  {
    passageObject: currentPassageObject,
    storyState: currentStoryState,
    history,
    lastLinkTags,
  },
) => ({
  dispatch,

  bookmark() {
    bookmark(dispatch);
  },

  navigateTo(passageName, tags?) {
    navigate({
      dispatch,
      passageName,
      tags: tags || [],
    });
  },

  restart() {
    reset({
      currentPassageObject,
      dispatch,
      lastLinkTags,
      storyState: currentStoryState,
    });
  },

  rewind(filter?: IHistoryFilter) {
    if (typeof filter === 'function') {
      let index = 0;
      let done = false;
      history.past.forEach((frame) => {
        if (!done && filter(frame)) {
          done = true;
        } else {
          index += 1;
        }
      });

      if (!index) {
        throw new Error();
      }

      rewind(dispatch, index);
    } else {
      rewind(dispatch);
    }
  },
});

export const PassageContentsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageContentsContainer);
