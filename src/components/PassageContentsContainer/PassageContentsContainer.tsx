import {
  bookmark as doBookmark,
} from '../../state/bookmark';
import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
import {
  getTag,
} from '../../tags/getTag';
import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IAction,
} from '../../actions/IAction';
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
  IPassageContentsContainerStateProps &
  IPassageContentsContainerDispatchProps
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
      passageObject,
      passageObject: { contents },
      plugins,
      navigateTo,
      soundManager,
      storyState,
    } = this.props;
 
    const SafeContents = assertValid<React.ComponentClass<IPassageProps> | React.SFC<IPassageProps>>(
      contents,
      strings.COMPONENT_NOT_FOUND,
    );

    assert(
      Array.isArray(passageObject.tags) &&
        !getTag(passageObject.tags, BuiltInTags.NoRender),
      strings.CANT_RENDER_NORENDER_PASSAGE,
    );

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

    return <SafeContents {...propsPassedDown} />;
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
      rewind: doRewind,
      history: {
        present,
        past,
      },
    } = this.props;

    doRewind(present, past, filter);
  }
}

export const mapStateToProps: MapStateToProps<
  IPassageContentsContainerStateProps,
  IPassageContentsContainerOwnProps,
  IState
> =
({
  history,
  history: {
    present: {
      passageName,
      storyState,
      lastLinkTags,
    },
  },
}, { passagesMap: { [passageName]: passageObject } }) =>
{
  assert(passageObject, strings.PASSAGE_NOT_FOUND.replace('%NAME%', name));
  return {
    history,
    lastLinkTags,
    passageObject,
    storyState,
  };
};

export const mapDispatchToProps: MapDispatchToProps<
  IPassageContentsContainerDispatchProps,
  IPassageContentsContainerOwnProps
> = (
  dispatch: Dispatch<IAction>,
  { plugins },
) => ({
  dispatch,

  bookmark() {
    doBookmark(dispatch);
  },

  restart(
    passageObject: IPassage,
    storyState: IStoryStateFrame,
    lastLinkTags: Tag[],
  ) {
    reset({
      dispatch,
      lastLinkTags,
      passageObject,
      plugins,
      storyState,
    });
  },

  rewind(
    present: IStateFrame,
    past: IStateFrame[],
    filter?: HistoryFilter,
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
