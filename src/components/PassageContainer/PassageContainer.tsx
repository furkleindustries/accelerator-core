import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
import {
  createStoryStateUpdateAction,
} from '../../actions/creators/createStoryStateUpdateAction';
import {
  getFootersList,
} from '../../passages/getFootersList';
import {
  getHeadersList,
} from '../../passages/getHeadersList';
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
  IFooter,
} from '../../passages/IFooter';
import {
  IHeader,
} from '../../passages/IHeader';
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
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  IState,
} from '../../reducers/IState';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';
import {
  navigate,
} from '../../state/navigate';
import {
  ConnectedPassagePluginsWrapper,
} from '../PassagePluginsWrapper/PassagePluginsWrapper';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
  MergeProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  reset,
} from '../../state/reset';
import {
  TStoryStateHistory,
} from '../../state/TStoryStateHistory';

import * as React from 'react';

// @ts-ignore
import _styles from './PassageContainer.scss';
import getPluginsList from 'src/plugins/getPluginsList';
import IStoryStateUpdateAction from 'src/actions/IStoryStateUpdateAction';
const styles = _styles || {};

export const strings = {
  COMPONENT_CONSTRUCTOR_NOT_FOUND:
    'The contents property of the passage object passed to PassageContainer ' +
    'was not found.',

  CANT_RENDER_NORENDER_PASSAGE:
    'A passage with the tag "noRender" was passed to PassageContainer. ' +
    'These passages cannot be rendered and should be used solely for ' +
    'exporting reusable content.',
  
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

export class PassageContainer extends React.PureComponent<IPassageContainerOwnProps & IPassageContainerStateProps & IPassageContainerDispatchProps> {
  public render() {
    const {
      currentPassage,
      currentPassage: {
        contents,
      },

      dispatch,
      lastLinkTags,
      navigateTo,
    } = this.props;

    if (!contents) {
      throw new Error(strings.COMPONENT_CONSTRUCTOR_NOT_FOUND);
    } else if (Array.isArray(currentPassage.tags) &&
               getTag(currentPassage.tags, BuiltInTags.NoRender))
    {
      throw new Error(strings.CANT_RENDER_NORENDER_PASSAGE);
    }

    const propsPassedDown: IPassageProps = {
      dispatch,
      lastLinkTags,
      navigateTo,
      storyState: {},
      passageObject: currentPassage,

      restart() {
        throw new Error('This should never make it to the passage.');
      },

      setStoryState() {
        throw new Error('This should never make it to the passage.');
      },
    };

    /* If we were to pass the story state prop directly to the passage
     * component, PassageContainer would rerender every time story state was
     * updated. This would be expensive, and also PassageContainer is intended
     * to render only once per passage load. Instead, we pass down the props
     * which are never expected to change (all but the story state), and create
     * a connected component which will pass the story state directly to the
     * passage. */
    interface StateProps { storyState: IStoryStateInstance, };
    const passageMapStateToProps: MapStateToProps<StateProps, {}, IState> = ({
      storyStateHistory,
    }: {
      storyStateHistory: TStoryStateHistory
    }) => ({
      storyState: storyStateHistory[0],
    });

    interface DispatchProps {
      setStoryState(updatedStateProps: Partial<IStoryStateInstance>): IStoryStateUpdateAction;
    }

    const passageMapDispatchToProps: MapDispatchToProps<DispatchProps, { currentPassage: string }> = (dispatch, props) => ({
      setStoryState(updatedStateProps) {
        const action = createStoryStateUpdateAction(updatedStateProps);
        const ret = dispatch(action);
        const plugins = getPluginsList();
        plugins.forEach((plugin) => {
          if (typeof plugin.afterStoryStateChange === 'function') {
            plugin.afterStoryStateChange({
              updatedStateProps,
              currentPassageObject: props.currentPassage,
              currentStoryState: {},
              lastLinkTags: props.lastLinkTags,
            });
          }
        });

        return ret;
      },
    });

    const passageMergeProps: MergeProps<StateProps, any, any, IPassageProps> = (stateProps, dispatchProps, ownProps) => {
      return Object.assign({}, ownProps, dispatchProps, propsPassedDown, stateProps, {
          restart() {
            const {
              startPassage,
            } = getPassagesMap();

            reset({
              currentPassageObject: propsPassedDown.passageObject,
              currentStoryState: stateProps.storyState,
              dispatch: propsPassedDown.dispatch,
              lastLinkTags: propsPassedDown.lastLinkTags,
              startPassageName: startPassage.name,
            });
          },
      });
    }

    const ConnectedPassage = connect(
      passageMapStateToProps,
      passageMapDispatchToProps,
      passageMergeProps
    )(contents);

    const headers: IHeader[] = getHeadersList();
    const footers: IFooter[] = getFootersList();

    return (
      <div className={`${styles.passageContainer} passageContainer`}>
        <ConnectedPassagePluginsWrapper>
          <div className={`${styles.headersContainer} headersContainer`}>
            {headers}
          </div>

          <ConnectedPassage />

          <div className={`${styles.footersContainer} footersContainer`}>
            {footers}
          </div>
        </ConnectedPassagePluginsWrapper>
      </div>
    );
  }
}

export const mapStateToProps: MapStateToProps<IPassageContainerStateProps, IPassageContainerOwnProps, IState> = ({
  currentPassageName,
  passageHistory,
  startPassageName,
}) => {
  const {
    passagesMap,
  } = getPassagesMap();
  
  if (!(currentPassageName in passagesMap)) {
    const errStr = strings.PASSAGE_NOT_FOUND
      .replace('%NAME%', currentPassageName);

    throw new Error(errStr);
  }

  return {
    currentPassage: passagesMap[currentPassageName],
    lastLinkTags: passageHistory[0].linkTags,
    passages: passagesMap,
    startPassageName,
  };
};

export const mapDispatchToProps: MapDispatchToProps<IPassageContainerDispatchProps, IPassageContainerOwnProps & IPassageContainerStateProps> = (reduxDispatch: Dispatch<IAction>, props) => ({
  dispatch: reduxDispatch,

  navigateTo(passageName, tags?) {
    const {
      passagesMap,
    } = getPassagesMap();

    navigate({
      dispatch: reduxDispatch,
      passage: passagesMap[passageName],
      tags: tags || [],
    });
  },
});

export const PassageContainerConnected = connect(mapStateToProps, mapDispatchToProps)(PassageContainer);

export default PassageContainerConnected;
