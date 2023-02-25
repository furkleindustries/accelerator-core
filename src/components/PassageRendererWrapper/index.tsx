import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  bookmark as doBookmark,
} from '../../state/bookmark';
import classNames from 'classnames';
import {
  createStoryEndAction,
} from '../../actions/creators/createStoryEndAction';
import {
  getStructuredTags,
} from '../../tags/getStructuredTags';
import {
  IPassageNamed,
} from '../../interfaces/IPassageNamed';
import {
  IPassageRendererDispatchProps,
} from './IPassageRendererDispatchProps';
import {
  IPassageRendererWrapperOwnProps,
} from './IPassageRendererWrapperOwnProps';
import {
  IPassageRendererWrapperStateProps,
} from './IPassageRendererWrapperStateProps';
import {
  IState,
} from '../../state/IState';
import {
  IStoryStateSetter,
} from '../../interfaces/IStoryStateSetter';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
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
import type {
  Store,
} from 'redux';
import {
  reset,
} from '../../state/reset';
import {
  rewind as doRewind,
} from '../../state/rewind';
import {
  SinglePassageRenderer,
} from '../../../renderers/SinglePassageRenderer';
import {
  Tag,
} from '../../tags/Tag';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export class PassageRendererWrapper extends React.PureComponent<
  IPassageRendererWrapperOwnProps &
    IPassageRendererWrapperStateProps &
    IPassageRendererDispatchProps
> {
  public readonly render = () => (
    <AppContextConsumerWrapper>
      {({ store }) => {
        const bookmark = this.bookmark;
        const endStory = this.endStory;
        const navigateTo = this.navigateTo;
        const rewind = this.rewind;
        const restart = () => this.restart(store);
        const setStoryState = this.setStoryState;

        const passageFunctions = {
          bookmark,
          endStory,
          navigateTo,
          rewind,
          restart,
          setStoryState,
        };

        return (
          <div
            className={classNames(
              builtIns['passage-renderer-wrapper'],
              'passage-renderer-wrapper',
              'single-passage-renderer',
            )}

            role="document"
          >
            <SinglePassageRenderer passageFunctions={passageFunctions} />
          </div>
        );
      }}
    </AppContextConsumerWrapper>
  );

  private readonly bookmark = () => doBookmark(this.props.dispatch);

  private readonly endStory = () => this.props.dispatch(
    createStoryEndAction(),
  );

  private navigateTo = (
    passageName: IPassageNamed['passageName'],
    tags?: MaybeReadonlyArray<Tag>,
  ) => {
    const {
      dispatch,
      passagesMap: { [passageName]: passage },
    } = this.props;

    assert(
      passage,
      strings.PASSAGE_NOT_FOUND.replace(/%name%/gi, passageName),
    );

    return navigate({
      dispatch,
      passage,
      linkTags: tags || [],
    });
  };

  private readonly restart = (store: Store<IState>) => {
    const {
      autoplayerState,
      config,
      getSoundManager,
      lastLinkTags: unstructured,
      passageObject,
      plugins,
      storyState,
    } = this.props;

    const lastLinkTags = getStructuredTags(unstructured);

    return reset({
      autoplayerState,
      config,
      getSoundManager,
      lastLinkTags,
      passageObject,
      plugins,
      store,
      storyState,
    });
  };

  private readonly rewind = () => (
    doRewind(this.props.dispatch, this.props.getSoundManager)
  );

  private readonly setStoryState: IStoryStateSetter = (
    updatedStateProps,
  ) => mutateCurrentStoryStateInstanceWithPluginExecution({
    updatedStateProps,
    autoplayerState: this.props.autoplayerState,
    dispatch: this.props.dispatch,
    getSoundManager: this.props.getSoundManager,
    history: this.props.history,
    passageObject: this.props.passageObject,
    plugins: this.props.plugins,
  });
}

export const mapStateToProps: MapStateToProps<
  IPassageRendererWrapperStateProps,
  IPassageRendererWrapperOwnProps,
  IState
> = (
  {
    autoplayerState,
    history,
    history: {
      present: {
        lastLinkTags,
        passageName,
        storyState,
      },
    }
  },

  {
    passagesMap: { [passageName]: passageObject },
  },
) => ({
  autoplayerState,
  history,
  lastLinkTags,
  storyState,
  passageObject,
});

export const mapDispatchToProps: MapDispatchToProps<
  IPassageRendererDispatchProps,
  IPassageRendererWrapperOwnProps
> = (dispatch) => ({ dispatch });

export const PassageRendererWrapperConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageRendererWrapper);
