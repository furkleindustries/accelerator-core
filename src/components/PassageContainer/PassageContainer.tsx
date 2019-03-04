import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper/AppContextConsumerWrapper';
import {
  bookmark as doBookmark,
} from '../../state/bookmark';
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
  IPassageRenderer,
} from '../../renderers/IPassageRenderer';
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
} from '../../state/IState';
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

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

const {
  rendererName,
  ...configWithoutRendererName
} = getNormalizedAcceleratorConfig();

let renderer: IPassageRenderer;

export class PassageRendererWrapper extends React.PureComponent<
  IPassageContainerOwnProps &
  IPassageContainerStateProps &
  IPassageContainerDispatchProps
> {
  public readonly render = () => {
    return (
      <AppContextConsumerWrapper>
        {({
          PassageRendererConstructor,
          ...contextWithoutRenderer
        }) => {
          if (!renderer) {
            const passageFuncs = {
              bookmark: this.bookmark,
              navigateTo: this.navigateTo,
              rewind: this.rewind,
              restart: this.restart,
            };

            renderer = new PassageRendererConstructor(
              configWithoutRendererName,
              contextWithoutRenderer,
              passageFuncs,
            );
          }

          return (
            <div className={`passageContainer ${rendererName}`}>
              {renderer.render()}
            </div>
          );
        }}
      </AppContextConsumerWrapper>
    );
  };

  private readonly bookmark = () => doBookmark(this.context.store.dispatch);

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
}

export const mapStateToProps: MapStateToProps<
  IPassageContainerStateProps,
  IPassageContainerOwnProps,
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
}, {
  passagesMap,
}) => ({
  history,
  lastLinkTags,
  storyState,
  passageObject: passagesMap[passageName],
});

export const mapDispatchToProps: MapDispatchToProps<{ dispatch: Dispatch<IAction> }, {}> = (dispatch) => ({
  dispatch,
});

export const PassageContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageRendererWrapper);
