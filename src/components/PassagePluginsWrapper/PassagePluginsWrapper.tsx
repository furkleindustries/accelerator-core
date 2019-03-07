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
  IPassagePluginsWrapperDispatchProps,
} from './IPassagePluginsWrapperDispatchProps';
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
  MapDispatchToProps,
} from 'react-redux';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  Dispatch,
} from 'redux';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

/* TODO: Investigate effects of hot-reloads on this component. */

/* Allows plugin markup to be injected alongside passage content as well
 * as ensuring plugins are only run once per render. */
export class PassagePluginsWrapper extends React.PureComponent<
  IPassagePluginsWrapperOwnProps & IPassagePluginsWrapperStateProps & IPassagePluginsWrapperDispatchProps,
  IPassagePluginsWrapperState
> {
  public static readonly contextType = ReactReduxContext;

  public readonly state = { shouldCallRenderPlugin: false };

  /* Stores the last seen passage time, allowing the component to discern
   * whether a passage navigation has occurred. */
  private lastPassageTime: number;
  /* Memoizes the output of the plugins, allowing them to be called once per
   * passage change. */
  private lastPluginsBeforeRenderOutput: ReactNodeWithoutNullOrUndefined;

  constructor(
    props: IPassagePluginsWrapperOwnProps & IPassagePluginsWrapperStateProps & IPassagePluginsWrapperDispatchProps
  ) {
    super(props);

    const {
      dispatch,
      lastLinkTags,
      passageName,
      passagesMap,
      plugins,
    } = props;

    const { store } = this.context;

    const safePassageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND.replace(/%name%/gi, passageName),
    );

    /** Call the afterStoryInit method on all plugins. In practice, this should
     * only happen in two cases: firstly, when the story is first loaded in the
     * browser, and secondly when the story is restarted. This must be
     * performed in the constructor as componentDidMount occurs after render,
     * and we want afterStoryInit to occur before beforeRender.
     */
    plugins.forEach(({ afterStoryInit }) => {
      if (typeof afterStoryInit === 'function') {
        afterStoryInit({
          lastLinkTags,
          store,
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

  public render = () => {
    const {
      children,
      lastLinkTags,
      passageName,
      passagesMap,
      passageTimeCounter,
      plugins,
      storyState,
    } = this.props;

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND,
    );

    /* Don't execute the beforeRender plugins, returning the memoized value
     * instead, if the passage time has not increased since the last render. */
    if (this.lastPluginsBeforeRenderOutput &&
        this.lastPassageTime === passageTimeCounter)
    {
      return this.lastPluginsBeforeRenderOutput;
    }

    let finalChildren = children;
    /* Apply the beforeRender lifecycle method of each plugin. */
    plugins.forEach(({ beforeRender }) => {
      if (typeof beforeRender === 'function') {
        finalChildren = beforeRender({
          lastLinkTags,
          passageObject,
          storyState,
          /**
           * If this value is set to the children variable only the
           * lowest-precedence plugin will render. Please set it to
           * finalChildren instead.
           */
          children: finalChildren,
        }) ||
        /* If for some reason the plugin is non-conformant and outputs
         * something falsy, use the last good children value. */
        finalChildren;
      }
    });

    /* Store a reference to the current passage time. */
    this.lastPassageTime = passageTimeCounter;
    /* Memoize the plugin output. */
    this.lastPluginsBeforeRenderOutput = finalChildren;
    
    return finalChildren;
  }

  public componentDidUpdate = () => {
    const {
      lastLinkTags,
      passageName,
      passagesMap,
      plugins,
      storyState,
    } = this.props;

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND,
    );

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

export const mapStateToProps: MapStateToProps<
  IPassagePluginsWrapperStateProps,
  IPassagePluginsWrapperOwnProps,
  IState
> = ({
  history: {
    present: {
      lastLinkTags,
      passageName,
      passageTimeCounter,
      storyState,
    },
  },
}) =>
({
  lastLinkTags,
  passageName,
  passageTimeCounter,
  storyState,
});

export const mapDispatchToProps: MapDispatchToProps<
  IPassagePluginsWrapperDispatchProps,
  {}
> = (dispatch: Dispatch<IAction>) => ({ dispatch });

export const PassagePluginsWrapperConnected = connect(
  mapStateToProps,
)(PassagePluginsWrapper);
