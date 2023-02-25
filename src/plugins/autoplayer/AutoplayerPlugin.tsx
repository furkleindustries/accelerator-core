import {
  autoScrollPage,
} from './autoScrollPage';
import {
  getNiceValueString,
} from '../../functions/getNiceValueString';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  IAutoplayerOutputRecord,
} from './IAutoplayerOutputRecord';
import {
  IAutoplayerWeightDelayFactorArgs,
} from './IAutoplayerWeightDelayFactorArgs';
import {
  IAutoplayerWeightedDelayArgs,
} from './IAutoplayerWeightedDelayArgs';
import {
  IPlugin,
} from '../IPlugin';
import {
  IState,
} from '../../state/IState';
import type {
  Store,
} from 'redux';

const {
  loggers,
  loggers: {
    log,
    warn,
  },
} = getNormalizedAcceleratorConfig();

export class AutoplayerPlugin implements IPlugin {
  private readonly createdTime = new Date().getTime();

  private startTime = new Date().getTime();
  private lastSeenTime = new Date().getTime();

  public readonly contentContainerSelector = '.ink-sections-block';
  private contentContainerElem: HTMLDivElement | null = null;

  private readonly newContentSelector = '.ink-section-block:last-of-type';

  public readonly choicesContainerSelector = '.ink-choice-list';
  private choicesContainerElem: HTMLUListElement | null = null;

  private outputMap = {
    passageTime: -1,
    playthroughTime: -1,
    outputStream: [] as IAutoplayerOutputRecord[],
  };

  private store: Store<IState>;

  public readonly afterStoryInit: IPlugin['afterStoryInit'] = ({
    config: {
      loggers: { log },
      storyMetadata: {
        description,
        title,
      },
    },

    store,
    store: { getState },
  }) => {
    this.store = store;

    const { debug } = getState();
    
    if (debug) {
      log(`Autoplayer created at ${new Date(this.createdTime).toUTCString()}.`);
    }

    Object.assign(window, { autoplayerOutput: this.outputMap });

    (document as any).firstElementChild.style.setProperty(
      '--ink-choice-content-delay-duration',
      '0ms',
    );

    (document as any).firstElementChild.style.setProperty(
      '--ink-choice-content-fade-duration',
      '1400ms',
    );

    setTimeout(() => {
      this.startTime = new Date().getTime();
      this.lastSeenTime = this.startTime;

      if (getState().debug) {
        const {
          hours,
          minutes,
          seconds,
        } = this.getTimestamp(this.startTime);

        log('---- Autoplayer ----');

        log(
          `Autoplayer is starting a new run of "${title}" ` +
            `at ${hours}h ` +
            `${minutes}m ` +
            `${seconds}s UTC.`,
        );

        log(`Story description "${description}".`);
        log('--------');
      }
    }, 555);
  };

  public readonly afterPassageChange: IPlugin['afterPassageChange'] = ({
    passageObject: { name: passageName },
    store: { getState },
  }) => {
    const {
      autoplayerState: { active: autoplayerActive },
      debug,
    } = getState();

    if (!autoplayerActive) {
      return;
    }

    this.lastSeenTime = new Date().getTime();

    if (debug) {
      const {
        hours,
        minutes,
        seconds,
      } = this.getTimestamp(this.startTime);

      const {
        hours: runHours,
        minutes: runMinutes,
        seconds: runSeconds,
      } = this.getTimestamp(this.lastSeenTime - this.startTime);

      log('---- Autoplayer ----');

      log(
        `Autoplayer is now active on passage "${passageName}" ` +
          `at ${hours}h ` +
          `${minutes}m ` +
          `${seconds}s UTC.`,
      );

      log(
        `The elapsed time for the current Autoplayer run is ` +
          `${runHours}h ` +
          `${runMinutes}m ` +
          `${runSeconds}s UTC.`,
      );

      log('--------');
    }
  };

  public readonly onAvailableChoices: IPlugin['onAvailableChoices'] = ({
    autoplayerState,
    choices,
    store: { getState },
  }) => {
    const { debug } = getState();

    const {
      active,
      baseDelayTime,
      scroll,
      maxDelayRatio,
      minDelayRatio,
      getRandomFactor,
      randomStrictBounding,
    } = autoplayerState;

    if (!active) {
      return;
    }

    this.lastSeenTime = new Date().getTime();

    this.refreshElemValues();

    if (baseDelayTime > 0) {
      if (debug) {
        log('---- Autoplayer ----');
      }

      const baseFactor = Math.floor(baseDelayTime);

      try {
        const newContentElem = this.contentContainerElem ?
          this.contentContainerElem.querySelector(this.newContentSelector) :
          null;

        if (!newContentElem) {
          if (debug) {
            warn(
              'Autoplayer could not find a new Ink content container element as a scroll target.',
            );
          }

          return;
        }

        const choicesContainerElem = this.choicesContainerElem;

        if (!choicesContainerElem) {
          if (debug) {
            warn(
              'Autoplayer could not find the Ink choices list element as a scroll target.',
            );
          }

          return;
        }

        const weightedDelay = this.getWeightedDelay({
          baseFactor,
          choicesContainerElem,
          minDelayRatio,
          maxDelayRatio,
          newContentElem,
          getRandomFactor,
          randomStrictBounding,
        });

        if (debug) {
          log(
            `Beginning Autoplayer countdown with ${weightedDelay} milliseconds delay.`,
          );

          log('--------');
        }

        let shouldAbortNow = false;
        const shouldAbort = () => shouldAbortNow;
        const textPane = this.contentContainerElem!;

        if (scroll) {
          const duration = Math.round(weightedDelay * 0.726);
          autoScrollPage({
            debug,
            duration,
            loggers,
            shouldAbort,
            textPane,
          });
        }

        const timerId = setTimeout(
          () => {
            const {
              autoplayerState: { active: autoplayerStillActive },
              debug,
            } = getState();

            // If a choice is already selected, 
            const selectedIdx = choices.findIndex((choice) => (
              choice === document.activeElement
            ));

            const idx = selectedIdx >= 0 ?
              selectedIdx :
              Math.floor(Math.random() * choices.length);

            const autoselectedChoice = choices[idx] as HTMLButtonElement | HTMLAnchorElement;

            if (!autoplayerStillActive || !this.choiceCanBeSelected(autoselectedChoice)) {
              shouldAbortNow = true;
              clearTimeout(timerId);

              if (debug) {
                log('---- Autoplayer ----');

                if (!autoplayerStillActive) {
                  log(
                    `The choice ${idx + 1} of ` +
                      `${choices.length} would have been chosen, ` +
                      `but the autoplayer was disabled between the start ` +
                      `and end of the timer.`,
                  );
                } else {
                  log(
                    `The choice ${idx + 1} of ` +
                      `${choices.length} would have been chosen, ` +
                      `but the element was not valid or present to select.`,
                  );
                }

                log('--------');
              }

              return;
            }

            this.lastSeenTime = new Date().getTime();

            if (debug) {
              log('---- Autoplayer ----');

              log(
                `Autoselecting choice ${idx + 1} of ` +
                  `${choices.length}.`,
              );

              log('--------');
            }

            this.outputMap.outputStream.push({
              elapsedTimeSinceStart: this.lastSeenTime - this.startTime,
              occurrenceTime: this.lastSeenTime,
              text: this.normalizeText(newContentElem),
              type: 'text',
            });
    
            this.outputMap.outputStream.push({
              elapsedTimeSinceStart: this.lastSeenTime - this.startTime,
              occurrenceTime: this.lastSeenTime,
              text: this.normalizeText([ ...choices ]),
              type: 'choice',
            });

            this.outputMap.outputStream.push({
              elapsedTimeSinceStart: this.lastSeenTime - this.startTime,
              occurrenceTime: this.lastSeenTime,
              text: this.normalizeText(autoselectedChoice),
              type: 'choice-selection',
            });

            autoselectedChoice.click();
          },

          weightedDelay,
        );
      } catch (err) {
        warn(err);
      }
    }
  };

  public readonly beforeRestart: IPlugin['beforeRestart'] = ({
    autoplayerState: { active: autoplayerActive },
  }) => {
    const { debug } = this.store.getState();

    if (!autoplayerActive) {
      return;
    }

    this.startTime = new Date().getTime();

    if (debug) {
      const {
        hours,
        minutes,
        seconds,
      } = this.getTimestamp(this.startTime);

      log('---- Autoplayer ----');

      log(
        `Autoplayer is restarting at ${hours}h ` +
          `${minutes}m ` +
          `${seconds}s UTC.`
      );

      log('--------');
    }
  };

  public readonly beforeStoryEnd: IPlugin['beforeStoryEnd'] = ({
    autoplayerState: { active },
  }) => {
    const { debug } = this.store.getState();

    if (!active) {
      return;
    }

    this.lastSeenTime = new Date().getTime();

    const {
      hours,
      minutes,
      seconds,
    } = this.getTimestamp(this.lastSeenTime);

    const elapsedTime = this.lastSeenTime - this.startTime;
    this.outputMap.playthroughTime = elapsedTime;

    if (debug) {
      const {
        hours: elapsedHours,
        minutes: elapsedMinutes,
        seconds: elapsedSeconds,
      } = this.getTimestamp(elapsedTime);

      const normalizedStartTime = `${elapsedHours} hours, ` +
        `${elapsedMinutes} minutes, ` +
        `${elapsedSeconds} seconds`;

      log('---- Autoplayer ----');

      log(
        `Autoplayer is ending at ${hours}h ` +
          `${minutes}m ` +
          `${seconds}s UTC.`,
      );

      log(
        `The completed Autoplayer iteration was ${normalizedStartTime} in duration.`,
      );

      log(getNiceValueString(this.outputMap));

      log('--------');
    }
  };

  public readonly choiceCanBeSelected = (
    autoselectedChoice: HTMLElement | null | undefined,
  ) => {
    try {
      return Boolean(
        autoselectedChoice &&
          document.contains(autoselectedChoice) &&
          this.choicesContainerElem &&
          this.choicesContainerElem.contains(autoselectedChoice) &&
          autoselectedChoice.style.getPropertyValue('display') !== 'none' &&
          autoselectedChoice.style.getPropertyValue('opacity') !== '0' &&
          autoselectedChoice.style.getPropertyValue('visibility') !== 'false' &&
          !autoselectedChoice.hasAttribute('disabled') &&
          !autoselectedChoice.hidden &&
          !autoselectedChoice.classList.contains('active') &&
          !autoselectedChoice.classList.contains('disabled') &&
          !autoselectedChoice.classList.contains('hidden') &&
          !autoselectedChoice.classList.contains('title-selection-animation') &&
          !autoselectedChoice.classList.contains('title-nonselection-animation')
      );
    } catch (err) {
      warn(err);
    }

    return false;
  };

  public readonly refreshElemValues = () => {
    const {
      autoplayerState: { active },
      debug,
    } = this.store.getState();

    if (!active) {
      return;
    }

    this.contentContainerElem = document.body.querySelector(this.contentContainerSelector);
    if (!this.contentContainerElem) {
      if (debug) {
        warn(
          'Autoplayer could not find the Ink content container element.',
        );
      }

      return;
    }

    this.choicesContainerElem = document.body.querySelector(this.choicesContainerSelector);
    if (!this.choicesContainerElem) {
      if (debug) {
        warn(
          'Autoplayer could not find the Ink choices container element.',
        );
      }

      return;
    }
  };

  public readonly zeroPad = (input: number): string => (
    input < 10 ?
      `0${input}` :
      `${input}`
  );

  public readonly getTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    return {
      hours: this.zeroPad(date.getUTCHours()),
      minutes: this.zeroPad(date.getUTCMinutes()),
      seconds: this.zeroPad(date.getUTCSeconds()),
    };
  };

  public readonly getWeightedDelay = ({
    baseFactor,
    choicesContainerElem,
    minDelayRatio,
    maxDelayRatio,
    getRandomFactor,
    randomStrictBounding,
    newContentElem,
  }: IAutoplayerWeightedDelayArgs): number => {
    const textContent = `${newContentElem.textContent} ${choicesContainerElem.textContent}`;
    if (!textContent.length) {
      return 1;
    }

    const whitespaceRe = new RegExp(/\s+/g);
    const testMatch = whitespaceRe.test.bind(whitespaceRe);
    const words = textContent.split(whitespaceRe).filter(Boolean);
    const characters = Array.from(textContent).filter(Boolean) as string[];
    const charactersNoWhitespace = characters.filter(Boolean).filter(testMatch);
    const pixelHeight = newContentElem.clientHeight + choicesContainerElem.clientHeight;

    const weightedDelayFactor = this.weightDelayFactor({
      characters,
      charactersNoWhitespace,
      minDelayRatio,
      maxDelayRatio,
      pixelHeight,
      getRandomFactor,
      randomStrictBounding,
      words,
    });

    return Math.round(baseFactor * weightedDelayFactor);
  };

  public readonly weightDelayFactor = ({
    characters,
    charactersNoWhitespace,
    minDelayRatio,
    maxDelayRatio,
    pixelHeight,
    getRandomFactor,
    randomStrictBounding,
    words,
  }: IAutoplayerWeightDelayFactorArgs): number => {
    const { debug } = this.store.getState();

    const combinedCharLength = (characters.length + charactersNoWhitespace.length) / 2;
  
    const charLengthNormalized = Math.max(
      minDelayRatio,
      Math.min(maxDelayRatio, Math.log10(combinedCharLength) / 3),
    );

    const wordCountNormalized = Math.max(
      minDelayRatio,
      Math.min(maxDelayRatio, Math.log(words.length) / 4),
    );

    const pixelHeightNormalized = Math.max(
      minDelayRatio,
      Math.min(maxDelayRatio, pixelHeight / 350),
    );

    const unboundedAvg = charLengthNormalized *
      pixelHeightNormalized *
      wordCountNormalized;

    const randomFactor = getRandomFactor();

    let boundedAvg: number;
    if (randomStrictBounding === true) {
      boundedAvg = Math.max(
        minDelayRatio,
        Math.min(maxDelayRatio, unboundedAvg * randomFactor),
      );
    } else {
      boundedAvg = Math.max(
        minDelayRatio,
        Math.min(maxDelayRatio, unboundedAvg),
      ) * randomFactor;
    }

    if (debug) {
      log(`PixelHeight score:      ${pixelHeightNormalized.toFixed(4)}`);
      log(`WordCount score:        ${wordCountNormalized.toFixed(4)}`);
      log(`CharacterCount score:   ${charLengthNormalized.toFixed(4)}`);
      log(`Final score:            ${boundedAvg.toFixed(4)}`);
    }

    return boundedAvg;
  };

  public readonly normalizeText = (newContentElem: Element | Element[]) => {
    let arr = [];
    if (Array.isArray(newContentElem)) {
      arr = [ ...newContentElem ];
    } else {
      arr = [ newContentElem ];
    }

    return arr.reduce((str, elem) => (
      str + (elem.textContent || '').replace(/^\s+/, '') + '\n'
    ), '');
  };
}
