import {
  addTag,
} from '../../tags/addTag';
import {
  choiceAnimationDuration,
} from '../../../passages/_constants/choiceAnimationDuration';
import classNames from 'classnames';
import {
  createInkContainersRegistrationAction,
} from '../../actions/creators/createInkContainersRegistrationAction';
import {
  createInkContainersStateInitAction,
} from '../../actions/creators/createInkContainersStateInitAction';
import {
  createInkContainersStateUpdateAction,
} from '../../actions/creators/createInkContainerStateUpdateAction';
import {
  createInkContainersUnregistrationAction,
} from '../../actions/creators/createInkContainersUnregistrationAction';
import {
  createPassageTimeAction,
} from '../../actions/creators/createPassageTimeAction';
import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  getInkMutators,
} from '../../ink-mutators/getInkMutators';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  getPassagesMap,
} from '../../passages/getPassagesMap';
import {
  getPluginsList,
} from '../../plugins/getPluginsList';
import {
  getRawInkValue,
} from '../../functions/ink/getRawInkValue';
import {
  getTagNameToComponentMap,
} from '../../functions/getTagNameToComponentMap';
import {
  IMutateInkContentArgs,
} from './IMutateInkContentArgs';
import {
  InkContainerDispatchProps,
} from './InkContainerDispatchProps';
import {
  InkContainerStateFrame,
} from '../../state/InkContainerStateFrame';
import {
  InkContainerStateProps,
} from './InkContainerStateProps';
import {
  InkContainerOwnProps,
} from './InkContainerOwnProps';
import {
  InkContainerState,
} from './InkContainerState';
import {
  InkDoneCallback,
} from './InkDoneCallback';
import {
  InkLineObject,
} from '../InkSection/InkLineObject';
import {
  InkModule,
} from './InkModule';
import {
  InkMutatorObject,
} from '../../ink-mutators/InkMutatorObject';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  PassageNames,
} from '../../passages/IPassagesMap';
import {
  IState,
} from '../../state/IState';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  maxInkChoiceSwipeRight,
} from './maxInkChoiceSwipeRight';
import {
  mergeInkStateWithStoryState,
} from './mergeInkStateWithStoryState';
import {
  mutateCurrentStoryStateInstanceWithPluginExecution,
} from '../../state/mutateCurrentStoryStateInstanceWithPluginExecution';
import {
  mutateInkContent,
} from '../../functions/ink/mutateInkContent';
import {
  navigate,
} from '../../state/navigate';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  Story,
} from 'inkjs/engine/Story';
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

const config = getNormalizedAcceleratorConfig();
const {
  debugOptions: {
    loopStartInkModule,
    startInkPathString,
    startInkState,
    startPassageAfterMenu,
    stubLastPassageName,
  },

  loggers: {
    log,
    warn,
  },
} = config;


export class InkContainerUnconnected extends React.PureComponent<
  InkContainerOwnProps &
    InkContainerStateProps &
    InkContainerDispatchProps,

  InkContainerState
> {
  private readonly activeChoicesSelector = '.choice' +
    ':not(:disabled)' +
    ':not(.choice-selection-animation)' +
    ':not(.choice-unselection-animation)';


  private readonly choicesContainerSelector = '.ink-choices-container';
  private choiceSearchIntervalId: any;
  private readonly choiceSelector = '.choice';
  private readonly components = getTagNameToComponentMap();
  private continueTimerId: any;
  private readonly doneCallbacks: InkDoneCallback[] = [];
  private readonly scrollContainerSelector = '.ink-sections-block';
  private isUnloading = false;
  private readonly plugins = getPluginsList();
  private ref: React.RefObject<HTMLDivElement>;
  private readonly sectionBlockSelector = '.ink-section-block';

  public readonly state: InkContainerState = {
    content: [],
    currentChoices: [],
    inkModule: null,
    selectedDelayingChoice: -1,
    story: null,
  };


  public readonly render = () => {                                                                                                                                                                                                       
    const {
      children,
      className,
      inkContainerStateFrame,
      maxSwipeRight = maxInkChoiceSwipeRight,
    } = this.props;

    const {
      content,
      currentChoices,
      inkModule,
      selectedDelayingChoice,
    } = this.state;

    const {
      Article,
      InkChoicesContainer,
      InkSections,
    } = this.components;

    // Don't allow the story to be rendered in any way before it's loaded.
    if (!inkModule || !inkContainerStateFrame) {
      return null;
    }

    this.ref = this.ref || React.createRef();

    return (
      <Article
        className={classNames(
          builtIns['ink-container'],
          'ink-container',
          className,
        )}

        ref={this.ref}
        role="document"
      >
        <div
          className={classNames(
          builtIns['ink-subcontainer'],
          'ink-subcontainer',
          )}

          role="group"
        >
          <InkSections content={content} />

          <InkChoicesContainer
            choiceContent={currentChoices}
            maxSwipeRight={maxSwipeRight}
            onChoiceClick={this.clickChoice}
            selectedDelayingChoice={selectedDelayingChoice}
          />
        </div>

        {children}
      </Article>
    );
  };

  public readonly componentDidMount = () => {
    this.doMount();
  };

  public readonly componentWillUnmount = () => {
    this.isUnloading = true;
    if (this.choiceSearchIntervalId) {
      clearInterval(this.choiceSearchIntervalId);
      delete this.choiceSearchIntervalId;
    }

    if (this.continueTimerId) {
      clearTimeout(this.continueTimerId);
      delete this.continueTimerId;
    }
  };

  public readonly doMount = async () => {
    const {
      registerInkContainer,
      store: { getState },
    } = this.props;

    const { debug } = getState();

    const {
      inkModule,
      story,
    } = await registerInkContainer();
    
    this.setState({ story });

    this.registerAllDoneCallbacks();


    if (debug) {
      // Allow debug to set the initial path.
      if (startInkPathString) {
        story.ChoosePathString(startInkPathString);
      }
    }

    if (!this.choiceSearchIntervalId) {
      this.initializeChoicesAvailablePoller();
    }

    this.beginInkModule(inkModule);
  };

  public readonly beginInkModule = (inkModule: InkModule) => {
    const {
      lastPassageName,
      sendInitInkState,
      setStoryState,
    } = this.props;

    const { story: rawStory } = this.state;

    const story = assertValid<Story>(
      rawStory,
      'The story state property in InkContainer did not exist when beginInkModule was called.',
    );

    const mergedStoryState = this.initializeAndMergeStoryStates();

    this.setState(
      { inkModule },
      () => {
        // Use `true` because this is the first render on mount. 
        this.continueStory(true);
        sendInitInkState(story);
        setStoryState(mergedStoryState, lastPassageName);

        // Relevant state items guaranteed to be set after this.
      },
    );
  };

  public readonly registerAllDoneCallbacks = () => {
    const { doneCallbacks } = this.props;

    this.registerDoneCallback(this.defaultDoneCallback);

    if (typeof doneCallbacks === 'function') {
      this.registerDoneCallback(doneCallbacks);
    } else if (Array.isArray(doneCallbacks)) {
      doneCallbacks.forEach(this.registerDoneCallback);
    }
  };

  public readonly initializeAndMergeStoryStates = (): Partial<IStoryStateFrame> => {
    const {
      autoplayerState,
      dispatch,
      externalFunctions = {},
      getSoundManager,
      history,
      mergeExtraVariablesIntoStoryState = false,
      passageObject,
      storyState = {},
      store: { getState },
      variablesToMerge = {},
    } = this.props;

    const { story: rawStory } = this.state;

    const { debug } = getState();

    const story = assertValid<Story>(
      rawStory,
      'The story state property in InkContainer did not exist when initializeAndMergeStoryStates was called.',
    );

    const plugins = this.plugins;

    for (const key of Object.keys(externalFunctions)) {
      const raw = externalFunctions[key];

      const func = assertValid<(...args: any[]) =>  any>(
        raw,
        `The value provided as an external to InkContainer, ${raw} was not a function.`,
        (func) => typeof func === 'function',
      );
  
      story.BindExternalFunctionGeneral(key, func);
    }

    const mergedStoryState = { ...storyState };

    for (const key of Object.keys(variablesToMerge)) {
      story.variablesState.$(
        key,
        variablesToMerge[key],
      );

      if (mergeExtraVariablesIntoStoryState) {
        mergedStoryState[key] = variablesToMerge[key];
      }
    }

    for (const [ key, value ] of Object.entries(startInkState || {})) {
      story.variablesState.$(key, value);
    }

    for (const [ inkGlobalVarName ] of (story.variablesState as any)._globalVariables) {
      let shouldMergeKey = false;
      let value: number | string | boolean | null = getRawInkValue(story, inkGlobalVarName);

      if (inkGlobalVarName === 'DEBUG') {
        story.variablesState.$(inkGlobalVarName, debug);
      } else if (inkGlobalVarName === 'XLR8R_LAST_PASSAGE_NAME') {
        if ('XLR8R_LAST_PASSAGE_NAME' in variablesToMerge && variablesToMerge.XLR8R_LAST_PASSAGE_NAME) {
          value = variablesToMerge.XLR8R_LAST_PASSAGE_NAME;
        } else {
          value = history.past[history.past.length - 1].passageName;
        }

        story.variablesState.$(inkGlobalVarName, value);
      } else if (inkGlobalVarName === 'XLR8R_NEW_GAME') {
        if (value === 'XLR8R_PREVIOUS_VALUE') {
          shouldMergeKey = true;
          value = storyState[inkGlobalVarName];
          story.variablesState.$(inkGlobalVarName, value);
        }
      } else if (value === 'XLR8R_PREVIOUS_VALUE') {
        /* If the raw value is "XLR8R_PREVIOUS_VALUE", insert the
         * previous value forcibly into the Ink state, overwriting everything
         * else. Except for the above engine variables, which forcibly overwrite
         * Ink state, this is never done save for variables explicitly marked in
         * the `variablesToMerge` prop. */
        value = storyState[inkGlobalVarName];
        story.variablesState.$(inkGlobalVarName, value);

        if (!(inkGlobalVarName in variablesToMerge) || mergeExtraVariablesIntoStoryState) {
          shouldMergeKey = true;
        }
      } else if (!(inkGlobalVarName in variablesToMerge) || mergeExtraVariablesIntoStoryState) {
        shouldMergeKey = true;
      }

      if (shouldMergeKey) {
        Object.assign(mergedStoryState, { [inkGlobalVarName]: value });

        story.ObserveVariable(inkGlobalVarName, (variableName, newVal) => (
          mutateCurrentStoryStateInstanceWithPluginExecution({
            autoplayerState,
            dispatch,
            getSoundManager,
            history,
            passageObject,
            plugins,
            updatedStateProps: { [variableName]: newVal },
          })
        ));
      }
    }

    return mergedStoryState;
  };

  public readonly initializeChoicesAvailablePoller = () => (
    setTimeout(this.initPollerOnTimeout, 1500)
  );
  
  public readonly initPollerOnTimeout = () => (
    requestAnimationFrame(() => {
      const {
        autoplayerState,
        getSoundManager,
        lastLinkTags,
        passageObject,
        store,
        storyState,
      } = this.props;

      const plugins = this.plugins;

      const choiceSearchContainerElem = document.body.querySelector(
        this.choicesContainerSelector,
      );

      if (choiceSearchContainerElem) {
        let counter = 0;
        const maxTries = 25;
        this.choiceSearchIntervalId = setInterval(
          () => requestAnimationFrame(() => {
            if (counter >= maxTries) {
              clearInterval(this.choiceSearchIntervalId);
              delete this.choiceSearchIntervalId;

              warn(
                `Tried to emit "onChoicesAvailable" lifecycle event, but found no elements matching "${this.choiceSelector}" within "${this.choicesContainerSelector}" after ${maxTries} attempts.`,
              );

              return;
            }

            const choices = Array.from(
              choiceSearchContainerElem.querySelectorAll(this.choiceSelector),
            );
  
            if (choices.length) {
              clearInterval(this.choiceSearchIntervalId);
              delete this.choiceSearchIntervalId;
  
              plugins.forEach(({ onAvailableChoices }) => {
                if (typeof onAvailableChoices === 'function') {
                  onAvailableChoices({
                    autoplayerState,
                    choices,
                    config,
                    getSoundManager,
                    lastLinkTags,
                    passageObject,
                    store,
                    storyState,
                  });
                }
              });

              return;
            }

            counter += 1;
          }),

          555,
        );
      } else {
        warn(
          `Tried to emit "onChoicesAvailable" lifecycle event, but no choice container matches the selector "${this.choicesContainerSelector}".`,
        );
      }
    })
  );

  public readonly continueStory = (firstRender = false) => {
    const {
      advancePassageTime,
      mutatorObjects = getInkMutators(),
      updateInkContainerState,
    } = this.props;

    const {
      content,
      story: rawStory,
    } = this.state;

    const story = assertValid<Story>(
      rawStory,
      'The story state property in InkContainer did not exist when continueStory was called.',
    );

    /* Generate story text - loop through available content.
     * Get ink to generate the next paragraphs. */
    const newLines = this.getNewLines();
    const mutatedNewLines = this.getMutatedNewLines(newLines, mutatorObjects);
    const mutatedChoices = this.getMutatedChoices(mutatorObjects);

    updateInkContainerState(story);

    if (!firstRender) {
      advancePassageTime();
    }

    if (!this.isUnloading) {
      this.setState(
        {
          content: content.concat([ mutatedNewLines ]),
          currentChoices: mutatedChoices,
        },

        firstRender ? null : this.afterContinue.bind(this, story),
      );
    }
  };

  public readonly getNewLines = () => {
    const { story: rawStory } = this.state;

    const story = assertValid<Story>(
      rawStory,
      'The story state property in InkContainer did not exist when getNewLines was called.',
    );

    const continueLines: InkLineObject[] = [];
    while (story.canContinue) {
      const inkResponse = story.Continue() || '';
      continueLines.push({
        tags: (story.currentTags || []).map((val) => addTag(val)[0]),
        text: inkResponse,
        turnIndex: story.state.currentTurnIndex,
      });
    }

    return Object.freeze(continueLines);
  };

  public readonly getCurrentChoices = () => {
    const { story: rawStory } = this.state;

    const story = assertValid<Story>(
      rawStory,
      'The story state property in InkContainer did not exist when getCurrentChoices was called.',
    );

    return Object.freeze([ ...story.currentChoices ]);
  };

  public readonly getMutatedNewLines = (
    lines: readonly InkLineObject[],
    mutatorObjects: readonly InkMutatorObject[],
  ) => {
    const {
      inkModule: rawInkModule,
      story: rawStory,
    } = this.state;

    const story = assertValid<Story>(
      rawStory,
      'The story property in InkContainer.state did not exist when getMutatedNewLines was called.',
    );

    const inkModule = assertValid<InkModule>(
      rawInkModule,
      'The inkModule property in InkContainer.state did not exist when getMutatedNewLines was called.'
    );

    const components = this.components;

    return this.mutateInkContent({
      components,
      inkModule,
      lines,
      mutatorObjects,
      story,
    });
  };

  public readonly getMutatedChoices = (
    mutatorObjects: readonly InkMutatorObject[],
  ) => {
    const {
      inkModule: rawInkModule,
      story: rawStory,
    } = this.state;

    const inkModule = assertValid<InkModule>(
      rawInkModule,
      'Could not find the Ink module when InkContainer called getMutatedChoices.',
    );

    const story = assertValid<Story>(
      rawStory,
      'Could not find the Ink story when InkContainer called getMutatedChoices.',
    );

    const components = assertValid<Record<string, React.ComponentType<any>>>(
      this.components,
    );

    const onError = this.onMutateError;

    const choices = story.currentChoices;
    const turnIndex = story.state.currentTurnIndex;

    const mutatedChoices = choices.map(({ text }) => (
      mutateInkContent(
        mutatorObjects,
        {
          components,
          inkModule,
          onError,
          story,
          lines: [
            {
              // No support for tagged choices. Sorry.
              tags: [],
              text,
              turnIndex,
            },
          ],
        },
      )
    ));

    return mutatedChoices;
  };

  public readonly mutateInkContent = ({
    components,
    inkModule,
    lines,
    mutatorObjects,
  }: IMutateInkContentArgs): React.ReactNode => (
    mutateInkContent(mutatorObjects, {
      components,
      inkModule,
      lines,
      onError: this.onMutateError,
      story: assertValid<Story>(
        this.state.story,
        'Could not find the Ink story when InkContainer called mutateInkContent.',
      ),
    })
  );

  public readonly afterContinue = () => {
    const {
      autoplayerState,
      lastLinkTags,
      getSoundManager,
      passageObject,
      store,
      storyState,
    } = this.props;

    const { story: rawStory } = this.state;

    const story = assertValid<Story>(
      rawStory,
      'Could not find the Ink story when InkContainer called afterContinue.',
    );

    const choices = this.getCurrentChoices();
    const plugins = this.plugins;

    // Full continue and no choices means no more story.
    if (!story.canContinue && !choices.length)  {
      this.finish();
    } else {
      if (!autoplayerState.scroll) {
        this.scrollToTopOfNewContent();
      }

      if (!this.choiceSearchIntervalId) {
        this.choiceSearchIntervalId = setInterval(
          () => {
            const choices = Array.from(
              document.querySelectorAll(this.activeChoicesSelector),
            );

            if (choices.length) {
              clearInterval(this.choiceSearchIntervalId);

              this.choiceSearchIntervalId = null;

              plugins.forEach(({ onAvailableChoices }) => {
                if (typeof onAvailableChoices === 'function') {
                  onAvailableChoices({
                    autoplayerState,
                    choices,
                    config,
                    getSoundManager,
                    lastLinkTags,
                    passageObject,
                    store,
                    storyState,
                  });
                }
              });
            }
          },

          555,
        );
      }
    }
  };

  public readonly scrollToTopOfNewContent = () => {
    const container = this.getRefElement();
    const scrollContainer = assertValid<HTMLDivElement>(
      container.querySelector(this.scrollContainerSelector),
    );

    const scrollSelector = `${this.sectionBlockSelector}:not(:disabled):not(:empty):not([hidden]):last-of-type`;
    const lastActiveSection: HTMLDivElement | null = container.querySelector(scrollSelector);
    if (lastActiveSection) {
      scrollContainer.scrollTo({
        behavior: 'smooth',
        top: lastActiveSection.offsetTop - 50,
      });
    } else {
      warn('Could not find new Ink section block to scroll to.');
    }
  };

  public readonly clickChoice = (index: number) => {
    const {
      delayAfterChoice,
      inkContainerStateFrame,
    } = this.props;

    const { story: rawStory } = this.state;

    const { storyState } = assertValid<InkContainerStateFrame>(
      inkContainerStateFrame,
      'InkContainer could not find a storyState in the inkContainerStateFrame.',
    );

    const story = assertValid<Story>(
      rawStory,
      'InkContainer could not find an Ink story when clickChoice was called.',
    );

    story.state.LoadJsonObj(storyState);

    if (!this.isUnloading) {
      story.ChooseChoiceIndex(index);

      this.setState(
        { selectedDelayingChoice: index },
        () => {
          this.continueTimerId = setTimeout(
            () => (
              this.setState(
                {
                  selectedDelayingChoice: -1,
                  currentChoices: [],
                },

                () => this.continueStory(),
              )
            ),

            delayAfterChoice || choiceAnimationDuration,
          );
        },
      )
    }
  };

  public readonly getRefElement = () => assertValid<HTMLDivElement>(
    this.ref.current,
    'The ref element could not be found in InkContainer.getRefElement.',
  );

  public readonly observeVariable = (variableName: string, newValue: any) => {
    this.props.setStoryState(
      { [variableName]: newValue },
      this.props.lastPassageName,
    );

    if (typeof this.props.observerCallback === 'function') {
      this.props.observerCallback(variableName, newValue);
    }
  };

  public readonly finish = () => {
    const { inkContainerStateFrame } = this.props;
    const { story: rawStory } = this.state;
 
    const { storyState } = assertValid<InkContainerStateFrame>(
      inkContainerStateFrame,
      'The InkContainer unmounted, but it seems to have never finished setting the Ink state frame in game state after mounting. This is definitely an engine-level error.',
    );

    const story = assertValid<Story>(
      rawStory,
      'The InkContainer unmounted, but no Ink story could be found.',
    );

    story.state.LoadJsonObj(storyState);

    const doneCallbacks = this.doneCallbacks;
    doneCallbacks.forEach((callback) => callback(story));
  };

  public readonly defaultDoneCallback = (story: Story) => {  
    const {
      lastPassageName,
      navigateTo,
      setStoryState,
      store: { getState },
      unregisterInkContainer,
    } = this.props;

    const { debug } = getState();

    const { storyState } = assertValid<InkContainerStateFrame>(
      this.props.inkContainerStateFrame,
    );

    story.state.LoadJsonObj(storyState);

    const inkError = getRawInkValue(story, 'XLR8R_INK_ERROR');
    if (inkError) {
      throw new Error(
        `An error was encountered in the Ink context. The error is:\n${inkError}`,
      );
    }

    let outPassageName: PassageNames | null = null;
    if (debug &&
      loopStartInkModule &&
      startPassageAfterMenu &&
      startPassageAfterMenu !== 'XLR8R_RANDOM')
    {
      // Allow loopback of the same passage over and over.
      outPassageName = startPassageAfterMenu;
    } else {
      const outVal = getRawInkValue(story, 'XLR8R_OUT_PASSAGE');
      if (typeof outVal === 'string' && outVal) {
        outPassageName = outVal as PassageNames;
      }
    }

    story.variablesState.$('XLR8R_OUT_PASSAGE', outPassageName);

    mergeInkStateWithStoryState(story, setStoryState);

    unregisterInkContainer(story);

    if (outPassageName) {
      if (debug) {
        log(`---- XLR8R-Ink ----`);
        log(`The out passage from Ink was "${outPassageName}".`);
        log(`--------`);
      }

      navigateTo(outPassageName);
    } else if (debug && lastPassageName !== stubLastPassageName) {
      log(`---- XLR8R-Ink ----`);
      warn(`There was no out passage provided from Ink.`);
      log(`--------`);
    }
  };

  public readonly registerDoneCallback = (doneCallback: InkDoneCallback) => (
    void this.doneCallbacks.push(doneCallback)
  );

  public readonly onMutateError = (err: Error | string) => {
    throw new Error(String(err));
  };
};

export const mapStateToProps: MapStateToProps<
  InkContainerStateProps,
  InkContainerOwnProps,
  IState & { history: { index: number } }
> = (
  {
    autoplayerState,
    debug,
    history,
    history: {
      past,
      present: {
        inkContainers,
        lastLinkTags,
        passageName,
        passageTimeCounter,
        storyState,
      },
    },
  },

  {
    components,
    dontMergeComponents,
    name,
  },
) => {
  const inkContainerStateFrame: InkContainerStateFrame | null = inkContainers[name] || null;
  const passagesMap = getPassagesMap();
  const passageObject = assertValid<IPassage>(
    passagesMap[passageName],
    'The passage object could not be found in InkContainer.',
  );

  const stateLastPassage = (past[past.length - 1] || {}).passageName;
  const lastPassageName = (debug ?
    stubLastPassageName || stateLastPassage :
    stateLastPassage) || getNormalizedAcceleratorConfig().startPassageName;
    
  const nonCompProps = {
    autoplayerState,
    config,
    history,
    inkContainerStateFrame,
    lastLinkTags,
    passageObject,
    passageTimeCounter,
    storyState,
    lastPassageName,
  };

  if (components && dontMergeComponents === true) {
    return {
      components,
      ...nonCompProps,
    };
  }

  const tagNameToComponentMap = getTagNameToComponentMap();

  const defaultComponents = {
    ...tagNameToComponentMap,
    ...Object.values(tagNameToComponentMap).reduce((obj, component) => {
      obj[component.name] = component;
      return obj;
    }, {}),
  };

  if (components) {
    return {
      components: {
        ...defaultComponents,
        ...components,
      },

      ...nonCompProps,
    };
  }

  return {
    components: { ...defaultComponents },
    ...nonCompProps,
  };
};

export const mapDispatchToProps: MapDispatchToProps<
  InkContainerDispatchProps,
  InkContainerOwnProps
> = (dispatch, { name }) => ({
  dispatch,

  advancePassageTime: () => (
    dispatch(createPassageTimeAction())
  ),

  navigateTo: (passageName) => {
    const {
      [passageName]: passage,
    } = getPassagesMap();

    assert(
      passage,
      `The Ink out passage variable, "${passageName}", did not match any known passages.`,
    );

    return navigate({
      dispatch,
      passage,
      linkTags: [],
    });
  },

  registerInkContainer: async (): Promise<{
    story: Story,
    inkModule: InkModule,
  }> => {
    const inkModule: InkModule = await import(`../../../passages/${name}/${name}.ink`);

    const story = new Story(inkModule.storyContent);

    dispatch(createInkContainersRegistrationAction({
      name,
      storyState: JSON.parse(story.state.ToJson()),
   }));

    return {
      inkModule,
      story,
    };
  },

  sendInitInkState: (story) => (
    dispatch(createInkContainersStateInitAction({
      name,
      storyState: JSON.parse(story.state.ToJson()),
    }))
  ),

  setStoryState: (
    updatedStateProps: Partial<IStoryStateFrame>,
    lastPassageName: string,
  ) => dispatch(createStoryStateAction(
    updatedStateProps,
    lastPassageName,
  )),

  updateInkContainerState: (story: Story) => (
    dispatch(createInkContainersStateUpdateAction({
      name,
      storyState: JSON.parse(story.state.ToJson()),
    }))
  ),

  unregisterInkContainer: (story: Story) => (
    dispatch(createInkContainersUnregistrationAction({
      name,
      storyState: JSON.parse(story.state.ToJson()),
    }))
  ),
});

export const InkContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InkContainerUnconnected);
