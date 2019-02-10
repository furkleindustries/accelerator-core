import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  IAction,
} from '../../actions/IAction';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassagePluginsWrapperOwnProps,
} from './IPassagePluginsWrapperOwnProps';
import {
  IPassagePluginsWrapperState,
} from './IPassagePluginsWrapperState';
import {
  IPassagePluginsWrapperStateProps,
} from './IPassagePluginsWrapperStateProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapStateToProps,
  ReactReduxContext,
} from 'react-redux';
import {
  Store,
} from 'redux';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

/* Allows plugin markup to be injected alongside passage content as well
 * as ensuring plugins are only run once per render. */
export class PassagePluginsWrapper extends React.PureComponent<IPassagePluginsWrapperOwnProps & IPassagePluginsWrapperStateProps, IPassagePluginsWrapperState> {
  public static readonly contextType = ReactReduxContext;

  public readonly state = { shouldCallRenderPlugin: false };

  /* Stores the last seen passage time, allowing the component to discern
   * whether a passage navigation has occurred. */
  private __lastPassageTime: number;
  /* Memoizes the output of the plugins, allowing them to be called once per
   * passage change. */
  private __lastPluginsBeforeRenderOutput: React.ReactNode;

  constructor(props: IPassagePluginsWrapperOwnProps & IPassagePluginsWrapperStateProps, context: any) {
    super(props);

    const {
      lastLinkTags,
      passageName,
      passagesMap,
      plugins,
    } = props;

    const {
      store,
      store: {
        dispatch,
        getState,
      },
    } = context;

    const {
      history: {
        present: { storyState },
      },
    } = getState();

    const safePassageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND.replace('%NAME%', passageName),
    );

    /* Call the afterStoryInit method on all plugins. In practice, this should
     * only happen in two cases: firstly, when the story is first loaded in the
     * browser, and secondly when the story is restarted. This must be
     * performed in the constructor as componentDidMount occurs after render,
     * and we want afterStoryInit to occur before beforeRender. */
    plugins.forEach(({ afterStoryInit }) => {
      if (typeof afterStoryInit === 'function') {
        afterStoryInit({
          lastLinkTags,
          store,
          storyState,
          passageObject: safePassageObject,
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
      lastLinkTags,
      passageName,
      passagesMap,
      plugins,
    } = this.props;

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND,
    );

    const {
      store: { getState },
    }: { store: Store<IState, IAction> } = this.context;

    const {
      history: {
        present: {
          passageTimeCounter,
          storyState,
        },
      },
    } = getState();

    /* Don't execute the beforeRender plugins, returning the memoized value
     * instead, if the passage time has not increased since the last render. */
    if (this.__lastPluginsBeforeRenderOutput &&
        this.__lastPassageTime === passageTimeCounter)
    {
      return this.__lastPluginsBeforeRenderOutput;
    }

    let finalChildren = children;
    /* Apply the beforeRender lifecycle method of each plugin. */
    plugins.forEach(({ beforeRender }) => {
      if (typeof beforeRender === 'function') {
        finalChildren = beforeRender({
          children,
          lastLinkTags,
          passageObject,
          storyState,
        }) ||
        /* If for some reason the plugin is non-conformant and outputs
         * something falsy, use the last good children value. */
        finalChildren;
      }
    });

    /* Store a reference to the current passage time. */
    this.__lastPassageTime = passageTimeCounter;
    /* Memoize the plugin output. */
    this.__lastPluginsBeforeRenderOutput = finalChildren;
    
    return finalChildren;
  }

  public componentDidUpdate() {
    const {
      lastLinkTags,
      passageName,
      passagesMap,
      plugins,
    } = this.props;

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND,
    );

    const {
      store: { getState },
    }: { store: Store<IState, IAction> } = this.context;

    const {
      history: {
        present: { storyState },
      },
    } = getState();

    plugins.forEach(({ afterPassageChange }) => {
      if (typeof afterPassageChange === 'function') {
        afterPassageChange({
          lastLinkTags,
          passageObject,
          storyState,
        });
      }
    });
  }
}

export const mapStateToProps: MapStateToProps<IPassagePluginsWrapperStateProps, IPassagePluginsWrapperOwnProps, IState> = ({
  history: {
    present: {
      lastLinkTags,
      currentPassageName: passageName,
    },
  },
}) =>
({
  lastLinkTags,
  passageName,
});

export const PassagePluginsWrapperConnected = connect(
  mapStateToProps,
)(PassagePluginsWrapper);
