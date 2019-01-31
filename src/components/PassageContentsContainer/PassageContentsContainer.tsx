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
  IStateFrame,
} from '../../state/IStateFrame';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  mutateCurrentStoryStateInstanceWithPluginExecution,
} from '../../state/mutateCurrentStoryStateInstanceWithPluginExecution';
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
import {
  reset,
} from '../../state/reset';
import {
  rewind,
} from '../../state/rewind';
import {
  Tag,
} from '../../tags/Tag';
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
  constructor(props: any) {
    super(props);

    this.restart = this.restart.bind(this);
    this.rewind = this.rewind.bind(this);
  }

  public render() {
    const {
      bookmark,
      dispatch,
      history,
      lastLinkTags,
      navigateTo,
      passageObject: currentPassageObject,
      passageObject: { contents },
      storyState: currentStoryState,
    } = this.props;

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
      passageObject: currentPassageObject,
      restart: this.restart,
      rewind: this.rewind,
      storyState: currentStoryState,
      setStoryState(updatedStateProps) {
        mutateCurrentStoryStateInstanceWithPluginExecution({
          dispatch,
          history,
          updatedStateProps,
        });
      },
    };

    return React.createElement(
      safeContents,
      propsPassedDown,
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

  private rewind(filter?: IHistoryFilter) {
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

export const mapDispatchToProps: MapDispatchToProps<IPassageContentsContainerDispatchProps, IPassageContentsContainerOwnProps> = (
  dispatch: Dispatch<IAction>,
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

  restart(
    currentPassageObject: IPassage,
    currentStoryState: IStoryStateFrame,
    lastLinkTags: Tag[],
  ) {
    reset({
      currentPassageObject,
      dispatch,
      lastLinkTags,
      storyState: currentStoryState,
    });
  },

  rewind(
    present: IStateFrame,
    past: IStateFrame[],
    filter?: IHistoryFilter,
  ) {
    if (typeof filter === 'function') {
      rewind(dispatch, present, past, filter);
    } else {
      rewind(dispatch, present, past);
    }
  },
});

export const PassageContentsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageContentsContainer);
