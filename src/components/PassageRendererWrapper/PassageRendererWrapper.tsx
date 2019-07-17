import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  bookmark as doBookmark,
} from '../../state/bookmark';
import classNames from 'classnames';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IAction,
} from '../../actions/IAction';
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
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IState,
} from '../../state/IState';
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
  rewind as doRewind,
} from '../../state/rewind';
import {
  Tag,
} from '../../tags/Tag';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/built-ins.less';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

const {
  rendererName,
  ...configWithoutRendererName
} = getNormalizedAcceleratorConfig();

export class PassageRendererWrapper extends React.PureComponent<
  IPassageRendererWrapperOwnProps &
    IPassageRendererWrapperStateProps &
    IPassageRendererDispatchProps
> {
  public readonly render = () => (
    <AppContextConsumerWrapper>
      {({
        PassageRendererComponent,
        ...contextWithoutRenderer
      }) => (
        <div className={classNames(
          builtIns.passageRendererWrapper,
          'passageRendererWrapper',
          rendererName,
        )}>
          <PassageRendererComponent
            config={configWithoutRendererName}
            context={contextWithoutRenderer}
            passageFunctions={{
              bookmark: this.bookmark,
              navigateTo: this.navigateTo,
              rewind: this.rewind,
              restart: this.restart,
              setStoryState: this.setStoryState,
            }}
          />
        </div>
      )}
    </AppContextConsumerWrapper>
  );

  private readonly bookmark = () => doBookmark(this.props.dispatch);

  private navigateTo(passageName: string, tags?: ReadonlyArray<Tag>) {
    const {
      dispatch,
      passagesMap: { [passageName]: passage },
    } = this.props;

    assert(
      passage,
      strings.PASSAGE_NOT_FOUND.replace(/%name%/gi, passageName),
    );

    navigate({
      dispatch,
      passage,
      linkTags: tags || [],
    });
  };

  private readonly restart = () => {
    const {
      dispatch,
      lastLinkTags,
      passageObject,
      plugins,
      storyState,
    } = this.props;

    reset({
      dispatch,
      lastLinkTags,
      passageObject,
      plugins,
      storyState,
    });
  };

  private readonly rewind = (filter?: HistoryFilter) => {
    const {
      dispatch,
      history: {
        present,
        past,
      },
    } = this.props;

    if (typeof filter === 'function') {
      doRewind(dispatch, present, past, filter);
    } else {
      doRewind(dispatch, present, past);
    }
  };

  private readonly setStoryState = (
    updatedStateProps: Partial<IStoryStateFrame>,
  ) => mutateCurrentStoryStateInstanceWithPluginExecution({
    updatedStateProps,
    dispatch: this.props.dispatch,
    history: this.props.history,
    passageObject: this.props.passageObject,
    plugins: this.props.plugins,
  });
}

export const mapStateToProps: MapStateToProps<
  IPassageRendererWrapperStateProps,
  { passagesMap: IPassagesMap },
  IState
> = ({
  history,
  history: {
    present: {
      lastLinkTags,
      passageName,
      storyState,
    },
  }
}, { passagesMap }) => ({
  history,
  lastLinkTags,
  storyState,
  passageObject: passagesMap[passageName],
});

export const mapDispatchToProps: MapDispatchToProps<
  { dispatch: Dispatch<IAction> },
  {}
> = (dispatch) => ({ dispatch });

export const PassageRendererWrapperConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageRendererWrapper);
