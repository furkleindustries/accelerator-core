import {
  DebugPlugin,
} from '../../plugins/DebugPlugin';
import {
  getPluginsList,
} from '../../plugins/getPluginsList';
import {
  getPassagesMap,
} from '../../passages/getPassagesMap';
import {
  IPassagePluginsWrapperStateProps,
} from './IPassagePluginsWrapperStateProps';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  IState,
} from '../../reducers/IState';
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

    const plugins: IPlugin[] = (() => {
      if (process && process.env &&
          process.env.NODE_ENV === 'development' &&
          process.env.ACCELERATOR_DEBUG === 'true')
      {
        return ([ new DebugPlugin() ] as IPlugin[]).concat(getPluginsList());
      }

      return getPluginsList();
    })();

    let finalChildren = children;
    /* Apply the beforeRender lifecycle method of each plugin. */
    plugins.forEach((plugin) => {
      if (typeof plugin.beforeRender === 'function') {
        finalChildren = plugin.beforeRender({
          children,
          lastLinkTags,
          currentPassageObject,
          currentStoryState: store.getState().storyStateHistory[0],
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

export const ConnectedPassagePluginsWrapper = connect(mapStateToProps)(PassagePluginsWrapper)

export default PassagePluginsWrapper;
