import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  getPassagesMap,
} from '../../passages/getPassagesMap';
import {
  getPluginsList,
} from '../../plugins/getPluginsList';
import {
  IAction,
} from '../../actions/IAction';
import {
  IPassagePluginsWrapperStateProps,
} from './IPassagePluginsWrapperStateProps';
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

  constructor(props: any, context: { store: Store<IState, IAction> }) {
    super(props);

    const {
      currentPassageObject,
      lastLinkTags,
    } = props;

    const {
      store,
      store: {
        dispatch,
        getState,
      },
    } = context;

    /* Call the afterStoryInit method on all plugins. In practice, this should
     * only happen in two cases: firstly, when the story is first loaded in the
     * browser, and secondly when the story is restarted. This must be
     * performed in the constructor as componentDidMount occurs after render,
     * and we want afterStoryInit to occur before beforeRender. */
    getPluginsList().forEach(({ afterStoryInit }) => {
      if (typeof afterStoryInit === 'function') {
        afterStoryInit({
          store,
          currentPassageObject,
          storyState: getState().history.present.storyState,
          lastLinkTags,
          setStoryState(updatedStateProps) {
            /* Do NOT call mutateCurrentStoryStateInstanceWithPluginExecution here,
            * as it may cause an infinite loop of plugin actions. */
            return dispatch(createStoryStateAction(updatedStateProps));
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
      store: { getState },
    }: { store: Store<IState, IAction> } = this.context;

    let finalChildren = children;
    /* Apply the beforeRender lifecycle method of each plugin. */
    getPluginsList().forEach(({ beforeRender }) => {
      if (typeof beforeRender === 'function') {
        finalChildren = beforeRender({
          children,
          lastLinkTags,
          currentPassageObject,
          storyState: getState().history.present.storyState,
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
      store: { getState },
    }: { store: Store<IState, IAction> } = this.context;
    getPluginsList().forEach(({ afterPassageChange }) => {
      if (typeof afterPassageChange === 'function') {
        afterPassageChange({
          currentPassageObject,
          lastLinkTags,
          storyState: getState().history.present.storyState,
        });
      }
    });
  }
}

export const mapStateToProps: MapStateToProps<IPassagePluginsWrapperStateProps, {}, IState> = ({
  history: {
    present: {
      lastLinkTags,
      currentPassageName: name,
    },
  }
}) =>
({
  lastLinkTags,
  currentPassageObject: getPassagesMap().passagesMap[name],
});

export const PassagePluginsWrapperConnected = connect(mapStateToProps)(PassagePluginsWrapper);
