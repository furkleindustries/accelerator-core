import {
  addTag,
} from '../../tags/addTag';
import {
  Article,
} from '../Article';
import classNames from 'classnames';
import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  getInkMutators,
} from '../../mutators/getInkMutators';
import {
  InkContainerDispatchProps,
} from './InkContainerDispatchProps';
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
  InkLineObject,
} from '../InkSection/InkLineObject';
import {
  InkSection,
} from '../InkSection';
import {
  IState,
} from '../../state/IState';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import {
  mergeInkStateWithStoryState,
} from './mergeInkStateWithStoryState';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  StoryWithDoneEvent,
} from '../../../lib/ink/StoryWithDoneEvent';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

import styles from './index.less';

export class InkContainerUnconnected extends React.PureComponent<
  InkContainerOwnProps & InkContainerStateProps & InkContainerDispatchProps,
  InkContainerState
> {
  public readonly state: InkContainerState = {
    choiceCounter: 0,
    sections: [],
  };

  private ref: React.RefObject<HTMLDivElement>;
  private story: StoryWithDoneEvent;

  public readonly render = () => {
    const {
      className,
      inkModule,
      mutatorObjects,
      ref,
    } = this.props;

    const {
      choiceCounter,
      sections,
    } = this.state;

    const story = this.story;

    const mergedMutatorsObjects = [
      ...getInkMutators(),
      ...(Array.isArray(mutatorObjects) ? mutatorObjects : []),
    ];

    this.ref = ref || this.ref || React.createRef();

    return (
      <Article
        className={classNames(styles.inkContainer, 'inkContainer', className)}
        ref={this.ref}
      >
        {sections.map(
          (
            {
              choices,
              lines,
            },
            key,
          ) => (
            <InkSection
              choices={choices}
              choicesVisible={choiceCounter === key}
              onClick={this.clickChoice}
              key={key}
            >
              {mergedMutatorsObjects.reduce<React.ReactNode>((
                currentNode,
                { content: mutator },
              ) => (
                mutator({
                  currentNode,
                  inkModule,
                  story,
                  lines,
                })
              ), lines.map(({ text }) => text).join('\n'))}
            </InkSection>
          )
        )}
      </Article>
    );
  };

  public readonly componentDidMount = async () => {
    const {
      doneCallback,
      inkModule: { storyContent },
      setStoryState,
      storyState,
    } = this.props;

    const story = new StoryWithDoneEvent(storyContent);

    if (typeof doneCallback === 'function') {
      story.__registerDoneCallback(this.defaultDoneCallback);
      story.__registerDoneCallback(doneCallback);
    }

    this.story = story;

    const mergedStoryState = {
      ...storyState,
      ...story.state.variablesState.jsonToken,
    };

    Object.keys(mergedStoryState).forEach((key) => {
      story.variablesState.SetGlobal(key, storyState[key]);
      story.ObserveVariable(key, this.observeVariable);
    });

    setStoryState(mergedStoryState);
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
    const { sections } = this.state;

    const story = this.story;
    /* Generate story text - loop through available content.
     * Get ink to generate the next paragraph. */
    const lines: InkLineObject[] = [];
    while (story.canContinue) {
      const inkResponse = story.Continue() || '';
      lines.push({
        tags: (story.currentTags || []).map((val) => (
          addTag(val)[0]
        )),

        text: inkResponse,
      });
    }

    const choices = story.currentChoices;
    this.setState({
      sections: sections.concat([
        {
          choices,
          lines,
        },
      ]),
    });

    this.scrollToBottom();
  };

  public readonly clickChoice = (index: number) => {
    this.setState({ choiceCounter: this.state.choiceCounter + 1 });
    this.story.ChooseChoiceIndex(index);
    this.continueStory();
  };

  public readonly getRefElement = () => assertValid<HTMLDivElement>(
    this.ref.current,
    'The ref element could not be found in InkContainer.getRefElement.',
  );

  public readonly observeVariable = (variableName: string, newValue: any) => {
    this.props.setStoryState({ [variableName]: newValue });
    if (typeof this.props.observerCallback === 'function') {
      this.props.observerCallback(variableName, newValue);
    }
  };

  public readonly defaultDoneCallback = (
    story: StoryWithDoneEvent,
    setStoryState: (updatedStoryState: IStoryStateFrame) => void,
  ) => void mergeInkStateWithStoryState(story, setStoryState);
};

export const mapStateToProps: MapStateToProps<
  InkContainerStateProps,
  InkContainerOwnProps,
  IState
> = ({
  history: {
    present: { storyState },
  },
}) => ({ storyState });

export const mapDispatchToProps: MapDispatchToProps<
  InkContainerDispatchProps,
  InkContainerOwnProps
> = (dispatch) => ({
  setStoryState: (updatedStoryState) => (
    dispatch(createStoryStateAction(updatedStoryState))
  ),
});

export const InkContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InkContainerUnconnected)
