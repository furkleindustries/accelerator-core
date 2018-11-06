import {
  getPassagesMap,
} from '../../passages/getPassagesMap';
import {
  getPluginsList,
} from '../../plugins/getPluginsList';
import {
  IPassagePluginsWrapperStateProps,
} from './IPassagePluginsWrapperStateProps';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  IState,
} from '../../state/IState';
import {
  object as ObjectProp,
} from 'prop-types';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  Store,
} from 'redux';

import * as React from 'react';
import { createStoryStateUpdateAction } from '../../actions/creators/createStoryStateUpdateAction';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

/* Allows plugin markup to be injected alongside passage content as well
 * as ensuring plugins are only run once per render. */
export class PassagePluginsWrapper extends React.PureComponent<{ children: React.ReactNode, } & IPassagePluginsWrapperStateProps> {
  public static contextTypes = {
    store: ObjectProp,
  };

  constructor(props: { children: React.ReactNode, } & IPassagePluginsWrapperStateProps, context: { store: Store<IState>, }) {
    super(props);

    const {
      currentPassageObject,
      lastLinkTags,
    } = props;

    const {
      store,
    } = context;

    /* Call the afterStoryInit method on all plugins. In practice, this should
     * only happen in two cases: firstly, when the story is first loaded in the
     * browser, and secondly when the story is restarted. This must be
     * performed in the constructor as componentDidMount occurs after render,
     * and we want afterStoryInit to occur before beforeRender. */
    const plugins = getPluginsList();
    plugins.forEach((plugin) => {
      if (typeof plugin.afterStoryInit === 'function') {
        plugin.afterStoryInit({
          store,
          currentPassageObject,
          currentStoryState: store.getState().storyStateHistory[0],
          lastLinkTags,
          setStoryState(updatedStateProps) {
            /* Do NOT call mutateCurrentStoryStateInstanceWithPluginExecution here,
            * as it may cause an infinite loop of plugin actions. */
            return store.dispatch(createStoryStateUpdateAction(updatedStateProps));
          },
        });
      }
    });
  }

  public render() {
    const {
      children,
      currentPassageObject,
      lastLinkTags,
    } = this.props;

    /* Get the store from the context so as to prevent re-execution of the
     * plugins' beforeRender method each time story state is mutated. */
    const {
      store,
    }: {
      store: Readonly<Store<IState>>,
    } = this.context;

    const plugins: IPlugin[] = getPluginsList();

    let finalChildren = children;
    /* Apply the beforeRender lifecycle method of each plugin. */
    plugins.forEach((plugin) => {
      if (typeof plugin.beforeRender === 'function') {
        finalChildren = plugin.beforeRender({
          children,
          lastLinkTags,
          currentPassageObject,
          currentStoryState: store.getState().storyStateHistory[0],
          /* If for some reason the plugin is non-conformant and outputs
           * something falsy, use the last good children value. */
        }) || finalChildren;
      }
    });        
    
    return finalChildren;
  }

  public componentDidUpdate() {
    const {
      currentPassageObject,
      lastLinkTags,
    } = this.props;

    const {
      store,
    }: {
      store: Store<IState>,
    } = this.context;

    const plugins = getPluginsList();
    plugins.forEach((plugin) => {
      if (typeof plugin.afterPassageChange === 'function') {
        plugin.afterPassageChange({
          currentPassageObject,
          lastLinkTags,
          currentStoryState: store.getState().storyStateHistory[0],
        });
      }
    });
  }
}

export const mapStateToProps: MapStateToProps<IPassagePluginsWrapperStateProps, {}, IState> = ({
  currentPassageName,
  passageHistory,
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
    currentPassageObject: passagesMap[currentPassageName],
    lastLinkTags: passageHistory[0].linkTags,
  };
};

export const PassagePluginsWrapperConnected = connect(mapStateToProps)(PassagePluginsWrapper)
