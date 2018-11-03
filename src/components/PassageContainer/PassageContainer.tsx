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
  getPluginsList,
} from '../../plugins/getPluginsList';
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
  IPlugin,
} from '../../plugins/IPlugin';
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
      restart,
      setStoryState,
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
      restart,
      setStoryState,
      storyState: {},
      passageObject: currentPassage,
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

    const plugins: IPlugin[] = getPluginsList();
    interface OwnProps { children: React.ReactNode };
    const passageMergeProps: MergeProps<StateProps, null, OwnProps, IPassageProps> = (stateProps, _, ownProps) => {
      /* Apply the beforeRender lifecycle method of each plugin. */
      let childrenAfterPlugins = ownProps.children;
      plugins.forEach((plugin) => {
        if (typeof plugin.beforeRender === 'function') {
          childrenAfterPlugins = plugin.beforeRender({
            lastLinkTags,
            children: childrenAfterPlugins,
            currentPassageObject: currentPassage,
            currentStoryState: stateProps.storyState,
          });
        }
      });

      return Object.assign({}, ownProps, propsPassedDown, stateProps, {
        childrenAfterPlugins,
      });
    }
    
    const ConnectedPassage = connect(
      passageMapStateToProps,
      null,
      passageMergeProps
    )(contents);

    const headers: IHeader[] = getHeadersList();
    const footers: IFooter[] = getFootersList();

    return (
      <div className={`${styles.passageContainer} passageContainer`}>
        <div className={`${styles.headersContainer} headersContainer`}>
          {headers}
        </div>

        <ConnectedPassage />

        <div className={`${styles.footersContainer} footersContainer`}>
          {footers}
        </div>
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
  dispatch(action) {
    return reduxDispatch(action);
  },

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

  restart() {
    const {
      startPassage,
    } = getPassagesMap();
    
    reset(reduxDispatch, startPassage.name);
  },

  setStoryState(updatedStateProps) {
    const action = createStoryStateUpdateAction(updatedStateProps);
    return reduxDispatch(action);
  },
})

export const PassageContainerConnected = connect(mapStateToProps, mapDispatchToProps)(PassageContainer);

export default PassageContainerConnected;
