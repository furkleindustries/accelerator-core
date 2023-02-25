import {
  createStoryEndAction,
} from '../../actions/creators/createStoryEndAction';
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
  PassageNames,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  IStateFrame,
} from '../../state/IStateFrame';
import {
  assertValid,
} from 'ts-assertions';
import {
  v4,
} from 'uuid';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

/* Allows plugin markup to be injected alongside passage content as well
 * as ensuring plugins are only run once per render. */
export class PassagePluginsWrapper extends React.Component<
  IPassagePluginsWrapperOwnProps
> {
  private readonly genesisTime = new Date().getTime();
  private lastPassageName: PassageNames;
  private lastSeenPluginsOutput: ReadonlyArray<React.ReactElement | null>;
  private unsubscribe: () => void;

  public readonly render = () => {
    if (!this.lastSeenPluginsOutput) {
      this.rerenderPluginsIfNeeded();
    }

    return (
      <>
        {this.lastSeenPluginsOutput}
        {this.props.children}
      </>
    );
  };

  public readonly componentDidMount = () => {
    const {
      config,
      getSoundManager,
      passagesMap,
      plugins,
      store,
      store: {
        getState,
        subscribe,
      },
    } = this.props;

    const {
      autoplayerState,
      history: {
        present: {
          lastLinkTags,
          passageName,
        },
      },
    } = getState();

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND.replace(new RegExp(/%name%/gi), passageName),
    );

    const setStoryState = this.setStoryState;

    this.unsubscribe = subscribe(this.renderSubscription);

    /**
     * Call the afterStoryInit method on all plugins. In practice, this should
     * only happen in two cases: one, when the story is first loaded in the
     * browser; two, when the story is restarted. This must be
     * performed in the constructor as componentDidMount occurs after render,
     * and we want afterStoryInit to occur prior to beforeRender.
     */
    plugins.forEach(({ afterStoryInit }) => {
      if (typeof afterStoryInit === 'function') {
        afterStoryInit({
          autoplayerState,
          config,
          getSoundManager,
          lastLinkTags,
          passageObject,
          setStoryState,
          store,
        });
      }
    });

    this.lastSeenPluginsOutput = Object.freeze(plugins.map((plugin) => (
      this.getPluginOutput(plugin, passageObject)
    )));
  };

  public readonly renderSubscription = () => {
    const {
      config,
      getSoundManager,
      passagesMap,
      plugins,
      store,
      store: { getState },
    } = this.props;

    const {
      autoplayerState,
      history: {
        present: {
          lastLinkTags,
          passageName,
          storyState,
        },
      },
    } = getState();

    /* Store a reference to the current passage name. */
  
    if (!this.lastPassageName) {
      this.lastPassageName = passageName;
      return;
    } else if (passageName === this.lastPassageName) {
      return;
    }

    /* Store a reference to the current passage name. This must come before
     * running plugin methods or this method may cause infinite loops. */
    this.lastPassageName = passageName;

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND,
    );

    this.rerenderPluginsIfNeeded();

    const setStoryState = this.setStoryState;

    plugins.forEach(({ afterPassageChange }) => {
      if (typeof afterPassageChange === 'function') {
        afterPassageChange({
          autoplayerState,
          config,
          getSoundManager,
          lastLinkTags,
          passageObject,
          setStoryState,
          store,
          storyState,
        });
      }
    });
  };

  public readonly componentWillUnmount = () => {
    const {
      config,
      getSoundManager,
      passagesMap,
      plugins,
      store: {
        dispatch,
        getState,
      },
    } = this.props;

    const {
      autoplayerState,
      history: {
        present: {
          lastLinkTags,
          passageName,
          passageTimeCounter,
          storyState,
          storyEnded,
        },
      },
    } = getState();

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      strings.PASSAGE_NOT_FOUND,
    );

    plugins.forEach(({ beforeStoryEnd }) => {
      if (typeof beforeStoryEnd === 'function') {
        beforeStoryEnd({
          autoplayerState,
          config,
          getSoundManager,
          lastLinkTags,
          passageObject,
          storyState,
          passageTimeAtEnd: passageTimeCounter,
          wallTimeAtBeginning: this.genesisTime,
          wallTimeAtEnd: new Date().getTime(),
        });
      }

      if (!storyEnded) {
        dispatch(createStoryEndAction());
      }
    });

    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
  };

  public readonly rerenderPluginsIfNeeded = () => {
    const {
      config,
      passagesMap,
      plugins,
      store: { getState },
    } = this.props;

    const {
      autoplayerState,
      history: {
        present: {
          passageName,
          storyState,
        },
      },
    } = getState();

    const passageObject = assertValid<IPassage>(
      passagesMap[passageName],
      `PassagePluginsWrapper could not find a passage matching the name "${passageName}".`,
    );

    if (this.lastSeenPluginsOutput) {
      this.lastSeenPluginsOutput = Object.freeze(plugins.map((plugin, idx) => {
        if (typeof plugin.shouldRerender === 'function') {
          const shouldRerenderOrNot = plugin.shouldRerender({
            autoplayerState,
            config,
            passageObject,
            storyState,
          });
  
          if (shouldRerenderOrNot === false) {
            const lastSeen = this.lastSeenPluginsOutput[idx];
            if (lastSeen) {
              return lastSeen;
            }
          }
        }
  
        return this.getPluginOutput(plugin, passageObject) || null;
      }));
    } else {
      this.lastSeenPluginsOutput = Object.freeze(plugins.map((plugin) => (
        this.getPluginOutput(plugin, passageObject)
      )))
    }
  };

  public readonly getPluginOutput = (plugin: IPlugin, passageObject: IPassage): React.ReactElement | null => {
    const {
      config,
      children,
      getSoundManager,
      store: { getState },
    } = this.props;

    const {
      autoplayerState,
      history: {
        present: {
          lastLinkTags,
          passageName,
          storyState,
        },
      },
    } = getState();

    const { beforeRender } = plugin;
    if (typeof beforeRender === 'function') {
      /* Apply the beforeRender lifecycle method of each plugin which
       * implements it. */
      const output = beforeRender({
        autoplayerState,
        children,
        config,
        getSoundManager,
        lastLinkTags,
        passageObject,
        storyState,
      });

      if (React.isValidElement(output)) {
        const cloneKey = `${passageName}-${v4()}`;
        return React.cloneElement(output, { key: cloneKey });
      }
    }

    return null;
  };

  private readonly setStoryState = (updatedStateProps: Partial<IStateFrame>) => {
    const {
      store: {
        dispatch,
        getState,
      },
    } = this.props;

    const {
      history: { past },
    } = getState();

    const lastPassageName = (past[past.length - 1] || {}).passageName || '';

    /* Do NOT call mutateCurrentStoryStateInstanceWithPluginExecution here,
     * as it may cause an infinite loop of plugin actions. */
    return dispatch(createStoryStateAction(
      { ...updatedStateProps },
      lastPassageName,
    ));
  };
}
