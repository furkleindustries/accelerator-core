import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassagePluginsWrapperOwnProps,
} from './IPassagePluginsWrapperOwnProps';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';
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
  IPassagePluginsWrapperOwnProps
> {
  /* Stores the last seen passage time, allowing the component to discern
   * whether a passage navigation has occurred. */
  private lastPassageTime: number;
  /* Memoizes the output of the plugins, allowing them to be called once per
   * passage change. */
  private lastPluginsBeforeRenderOutput: ReactNodeWithoutNullOrUndefined;

  constructor(props: IPassagePluginsWrapperOwnProps) {
    super(props);

    const {
      passagesMap,
      plugins,
      reduxStore: store,
      reduxStore: {
        dispatch,
        getState,
      }
    } = props;

    const {
      history: {
        present: {
          lastLinkTags,
          passageName,
        },
      },
    } = getState();

    const safePassageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND.replace(/%name%/gi, passageName),
    );

    /**
     * Call the afterStoryInit method on all plugins. In practice, this should
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
      passagesMap,
      plugins,
      reduxStore: { getState },
    } = this.props;

    const {
      history: {
        present: {
          lastLinkTags,
          passageName,
          passageTimeCounter,
          storyState,
        },
      },
    } = getState();

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
           * If this value is set to the `children` variable, only the
           * lowest-precedence plugin will render. Please keep it set to
           * `finalChildren` instead.
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
      passagesMap,
      plugins,
      reduxStore: { getState },
    } = this.props;

    const {
      history: {
        present: {
          lastLinkTags,
          passageName,
          passageTimeCounter,
          storyState,
        },
      }
    } = getState();

    if (passageTimeCounter === this.lastPassageTime) {
      return;
    }

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
