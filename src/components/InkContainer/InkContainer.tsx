import {
  Article,
} from '../Article/Article';
import classNames from 'classnames';
import {
  InkContainerOwnProps,
} from './InkContainerOwnProps';
import {
  InkSection,
} from '../InkSection/InkSection';
import {
  parsePlainTextAndReactElements,
} from '../../functions/parsePlainTextAndReactElements';
import {
  Story,
} from '../../../lib/ink/inkjs/src/Story';
import {
  StoryWithDoneEvent,
} from '../../../lib/ink/StoryWithDoneEvent';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import styles from './InkContainer.less';

export class InkContainer extends React.PureComponent<InkContainerOwnProps> {
  private ref: React.RefObject<HTMLDivElement>;
  private story: StoryWithDoneEvent;

  public readonly render = () => {
    const {
      className,
      ref,
    } = this.props;

    this.ref = ref || this.ref || React.createRef();

    return (
      <Article
        className={classNames(styles.inkContainer, 'inkContainer', className)}
        ref={this.ref}
      ></Article>
    );
  };

  public readonly componentDidMount = async () => {
    const {
      doneCallback,
      inputVariables,
      storyContent,
      variablesToObserve,
    } = this.props;

    const story = new StoryWithDoneEvent(storyContent);

    if (typeof doneCallback === 'function') {
      story.__registerDoneCallback(doneCallback);
    }

    this.story = story;

    if (inputVariables) {
      Object.keys(inputVariables).forEach((key) => (
        story.variablesState.SetGlobal(key, inputVariables[key])
      ));
    }

    if (Array.isArray(variablesToObserve)) {
      variablesToObserve.forEach(this.observeVariable);
    }

    this.continueStory();
  };

  public readonly showAfter = (
    delay: number,
    { classList }: HTMLElement,
  ) => setTimeout(() => classList.add('show'), delay);

  public readonly scrollToBottom = () => {
    const start = window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const dist = document.body.scrollHeight - window.innerHeight - start;
    if (dist < 0) {
      return;
    }

    const duration = 300 + 300 * dist / 100;
    let startTime: number | null = null;
    const step = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const t = (time - startTime) / duration;
      const lerp = 3 * t * t - 2 * t * t * t;
      window.scrollTo(0, start + lerp * dist);
      if (t < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  public readonly continueStory = () => {
    const {
      bindings,
      components,
      dontMergeComponents,
    } = this.props;

    const story = this.story;
    const refElement = this.getRefElement();
    const inkContents = [];
    /* Generate story text - loop through available content.
     * Get ink to generate the next paragraph. */
    const inkResponse = story.ContinueMaximally() || '';
    const textAndReactElems = parsePlainTextAndReactElements(
      inkResponse,
      {
        bindings,
        components,
        dontMergeComponents,
      },
    );

    inkContents.push(...textAndReactElems);

    const onClick = (index: number, e: Event) => this.clickChoice(index, e);

    const reactElem = (
      <InkSection
        onClick={onClick}
        parseProps={{
          bindings,
          components,
          dontMergeComponents,
        }}

        story={story}
      >
        {inkContents}
      </InkSection>
    );

    const container = document.createElement('div');
    refElement.appendChild(container);
    ReactDOM.render(reactElem, container);
    this.scrollToBottom();
  };

  public readonly clickChoice = async (
    index: number,
    e: Event,
  ) => {
    const choices = assertValid<HTMLButtonElement[]>(
      this.getRefElement().querySelectorAll('.choiceButton'),
      'The clicked choice could not be found in InkContainer.clickChoice.',
    );

    choices.forEach((choice) => {
      if (choice === e.currentTarget) {
        choice.blur();
        choice.classList.add('clicked');
      } else {
        choice.classList.add('hidden');
      }
    });

    this.story.ChooseChoiceIndex(index);
    this.continueStory();
  };

  public readonly getRefElement = () => assertValid<HTMLDivElement>(
    this.ref.current,
    'The ref element could not be found in InkContainer.getRefElement.',
  );

  public readonly observeVariable = (key: string) => this.story.ObserveVariable(
    key,
    assertValid<Story.VariableObserver>(
      this.props.observerCallback,
      'InkContainer.observeVariable was called but props.observerCallback ' +
        'is not a function.',
      (val) => typeof val === 'function',
    ),
  );
};
