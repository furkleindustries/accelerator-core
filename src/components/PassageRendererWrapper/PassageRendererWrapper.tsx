import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper/AppContextConsumerWrapper';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
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
  IPassageRendererWrapperOwnProps,
} from './IPassageRendererWrapperOwnProps';
import {
  navigate,
} from '../../state/navigate';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
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
  IPassageRendererWrapperOwnProps & { dispatch: Dispatch<IAction> }
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
            renderer = new PassageRendererConstructor(
              configWithoutRendererName,
              contextWithoutRenderer,
              this.navigateTo,
            );
          }
    
          /* TODO: Diagnose strange typing bug/error here. */
          return renderer.render() as React.ReactElement<IPassageProps>;
        }}
      </AppContextConsumerWrapper>
    );
  }

  private navigateTo(passageName: string, tags?: Tag[]) {
    debugger;
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
}

export const mapDispatchToProps: MapDispatchToProps<{ dispatch: Dispatch<IAction> }, {}> = (dispatch) => ({
  dispatch,
});

export const PassageRendererWrapperConnected = connect(
  null,
  mapDispatchToProps,
)(PassageRendererWrapper);
