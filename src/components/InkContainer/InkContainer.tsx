import {
  Article,
} from '../Article/Article';
import classNames from 'classnames';
import {
  InkContainerOwnProps,
} from './InkContainerOwnProps';
import {
  Story,
} from 'inkjs/engine/Story';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

import styles from './InkContainer.less';

export class InkContainer extends React.PureComponent<InkContainerOwnProps> {
  private ref: React.RefObject<HTMLDivElement>;
  private story: Story;

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

    const story = new Story(storyContent);
    this.story = story;

    if (inputVariables) {
      Object.keys(inputVariables).forEach((key) => (
        story.variablesState.SetGlobal(key, inputVariables[key])
      ));
    }

    if (Array.isArray(variablesToObserve)) {
      variablesToObserve.forEach(this.observeVariable);
    }

    await this.continueStory();

    if (typeof doneCallback === 'function') {
      doneCallback(story);
    }
  };

  public readonly showAfter = (
    delay: number,
    el: HTMLElement,
  ) => setTimeout(() => el.classList.add('show'), delay);

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
    }

    requestAnimationFrame(step);
  };

  public readonly continueStory = () => new Promise<void>((
    resolve,
    reject,
  ) => {
    const story = this.story;
    if (!story.canContinue) {
      return resolve();
    }
    
    let delay = 0.0;
    const refElement = this.getRefElement();

    /* Create container element. */
    const section = document.createElement('section');
    const list = document.createElement('ul');
    section.appendChild(list);

    /* Generate story text - loop through available content. */
    while (story.canContinue) {

      /* Get ink to generate the next paragraph. */
      const inkResponse = story.Continue() || '';
      section.append(...this.parsePlainTextAndReactElements(inkResponse));
      refElement.appendChild(section);

      /* Fade in paragraph after a short delay. */
      this.showAfter(delay, section);

      delay += 200.0;
    }

    /* Create HTML choices from ink choices. */
    this.story.currentChoices.forEach((choice) => {
      /* Create paragraph with anchor element. */
      const listItem = document.createElement('li');
      listItem.classList.add('choice');

      const listItemButton = document.createElement('button');
      listItemButton.innerHTML = choice.text;

      list.appendChild(listItem);

      // Fade choice in after a short delay
      this.showAfter(delay, list);
      delay += 200.0;

      listItemButton.addEventListener('click', async (e) => {
        // Don't follow <a> link
        e.preventDefault();

        // Remove all existing choices
        list.remove();

        // Tell the story where to go next
        story.ChooseChoiceIndex(choice.index);

        // Aaand loop
        this.continueStory().then(resolve, reject);
      });
    });

    this.scrollToBottom();
  });

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

  public readonly parsePlainTextAndReactElements = (text: string) => {
    const elems: HTMLElement[] = [];
    let underscoresInRow = 0;
    let inReactMode = false;
    let blockStartIndex = 0;
    for (let ii = 0; ii < text.length; ii += 1) {
      const char = text[ii];
      if (char === '_') {
        underscoresInRow += 1;
        if (underscoresInRow === 3) {
          const block = text.slice(blockStartIndex, ii);
          if (inReactMode) {
            /* Do JSX parsing. */
          } else {
            const span = document.createElement('span');
            span.innerHTML = block;
            elems.push(span);
          }

          inReactMode = !inReactMode;
          underscoresInRow = 0;
          blockStartIndex = ii + 1;
        }
      }
    }

    return elems;
  };
};
