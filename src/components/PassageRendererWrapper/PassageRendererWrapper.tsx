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
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IAction,
} from '../../actions/IAction';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IPassageRenderer,
} from '../../renderers/IPassageRenderer';
import {
  IPassageRendererWrapperDispatchProps,
} from './IPassageRendererWrapperDispatchProps';
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

const passagesMapAndStartPassagesNameContext = getPassagesMapAndStartPassageNameContext();

const {
  rendererName,
  ...configWithoutRendererName
} = getNormalizedAcceleratorConfig();

let renderer: IPassageRenderer;

export class PassageRendererWrapper extends React.PureComponent<
  IPassageRendererWrapperOwnProps &
  IPassageRendererWrapperStateProps &
  IPassageRendererWrapperDispatchProps
> {
  public static contextType = passagesMapAndStartPassagesNameContext;

  public render() {
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

          /* TODO: Diagnose strange typing bug/error here. */
          return renderer.render() as React.ReactElement<IPassageProps>;
        }}
      </AppContextConsumerWrapper>
    );
  }

  private readonly bookmark = () => doBookmark(this.context.store.dispatch);

  private navigateTo(passageName: string, tags?: ReadonlyArray<Tag>) {
    const { dispatch } = this.props;

    const {
      passagesMap: { [passageName]: passage },
    } = this.context;

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

export const mapStateToProps: MapStateToProps<any, IPassageRendererWrapperOwnProps, IState> = ({
  history,
}) => ({
  history,
});

export const mapDispatchToProps: MapDispatchToProps<{ dispatch: Dispatch<IAction> }, {}> = (dispatch) => ({
  dispatch,
});

export const PassageRendererWrapperConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageRendererWrapper);
