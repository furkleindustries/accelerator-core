import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper/AppContextConsumerWrapper';
import {
  bookmark as doBookmark,
} from '../../state/bookmark';
import classnames from 'classnames';
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
  IPassageRendererWrapperOwnProps &
  IPassageRendererWrapperStateProps &
  IPassageRendererDispatchProps
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
            <div className={classnames(
              'passageRendererWrapper',
              rendererName,
            )}>
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

export const PassageRendererWrapperConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageRendererWrapper);
