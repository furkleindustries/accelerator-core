/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* Accelerator components, interfaces, functions, etc. Feel free to destructure
 * these as you see fit. */
import * as components from '../../bundles/componentsBundle'; 
import * as passages from '../../bundles/passagesBundle';
import * as tags from '../../bundles/tagsBundle';

/* Import the passage style. See css-modules.d.ts for types. */
import styles from './sample-passage.scss';

/* Import the built-in styles. These are bare-minimum defaults that are meant
 * to be overridden by authors. */
import builtInStyles from '../_global-styles/built-ins.scss';

/* Images (see images.d.ts for allowed types) are imported as URLs to
 * the file in the public/ directory. */
import logo from '../../public/logo.svg';

interface SampleComponentState {
  readonly soundPlaying: boolean,
  readonly soundLoaded: boolean,
}

class Component extends React.PureComponent<
  passages.IPassageProps,
  SampleComponentState 
> {
  public state = {
    soundPlaying: false,
    soundLoaded: false,
  };

  private soundName: 'sample' = 'sample';

  constructor(props: passages.IPassageProps) {
    super(props);

    const { soundManager }: passages.IPassageProps = props;
    if (soundManager.collection.hasSound(this.soundName)) {
      this.state.soundLoaded = true;
    } else {
      soundManager.collection.addSound(
        this.soundName,
        'https://s3.amazonaws.com/furkleindustries-accelerator/Zymbel_The_Real_Horst-1113884951.mp3',
      ).then(
        () => this.setState({ soundLoaded: true }),
        (err) => { throw err; },
      );
    }
  }

  /* Use arrow functions so the methods autobind. */
  public render = () => {
    const {
      bookmark,
      passageObject,
      storyState: {
        counter,
        cycleVar,
      },
    } = this.props;

    const {
      soundLoaded,
      soundPlaying,
    } = this.state;

    return (
      <article className={passageObject.name}>
        <h2>
          This is the sample Accelerator passage.
        </h2>

        <img
          className={styles.image}
          /* See note above on logo import. */
          src={logo}
        />

        {/* Move to new passages with the Link component. */}
        <components.Link
          /* Use the built in style for links. This is opt-in because it should
           * be as easy as possible to do without default framework styling. */
          className={`${styles.link}`}
          passageName="my-first-passage"
        >
          This is a link. Try creating a new passage with
          <pre>
            accelerator-tool new passage my-first-passage
          </pre>
          and clicking on the link.
        </components.Link>

        <components.Button
          className={`${styles.button} ${styles.counter}`}
          /* Set the click handler of the element to execute the component's
           * clickIncrementor method. */
          onClick={this.clickIncrementor}
        >
          Clicking this button will update the counter below.
        </components.Button>

        {/* This will update reactively, without the need for any rendering
          * logic on your part. */}
        <p>
          <em>{counter || 0}</em>
        </p>

        <components.CyclingLink
          /* Set the value of the cycleVar variable to the current state of
           * the cycling link. */
          variableToSet="cycleVar"
          className={builtInStyles.link}
        >{[
          /* Children should be an array of strings. */
          'This is a cycling link.',

          'You can click it to change a value between several blocks of ' +
            'text.',

          'Each time the link changes, it updates the `cycleVar` variable ' +
            'to reflect the current value of the link.',

          'You can set any variable through the variableToSet property.',
        ]}</components.CyclingLink>

        <p>
          {/* This value updates automatically to match the cycling link
            * choice. */}
          <em className={styles.cycleVar}>
            {cycleVar}
          </em>
        </p>

        <p>
          <components.Button
            className={builtInStyles.link}
            onClick={bookmark}
          >
            If you click this, it sets a bookmark.
          </components.Button>
        </p>

        <p>
          <components.Button
            className={builtInStyles.link}
            onClick={this.toggleSampleSound}
            {
              /* Disable the button until the sound is loaded. */
              ...(soundLoaded ? {} : { disabled: true })
            }
          >{soundPlaying ?
            'Pause sound' :
            'Play sound'
          }</components.Button>
        </p>
      </article>
    );
  };

  private clickIncrementor = () => {
    const {
      setStoryState,
      storyState: { counter },
    } = this.props;

    const newVal = (counter || 0) + 1;
    setStoryState({ counter: newVal });
  };

  private toggleSampleSound = () => {
    const {
      soundManager: { collection },
    } = this.props;

    const sound = collection.getSound('sample');
    if (sound.isPlaying()) {
      sound.pause();
      this.setState({ soundPlaying: false });
    } else {
      sound.play().then(() => this.setState({ soundPlaying: false }));
      this.setState({ soundPlaying: true });
    }
  };
}

const passage: passages.IPassage = {
  /* string: the story-unique name of the passage. */
  name: 'sample-passage',

  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } Tag objects. */
  tags: [
    /* Mark the passage as the first that should be rendered when the story is
     * started. */
    tags.BuiltInTags.Start,

    /* Tags can also be added as key-value pairs. */
    {
      key: 'anotherTag',
      value: 'anotherTagValue',
    },
  ],

  /* React.ComponentType<IPassageProps>: the content that should be
   * displayed. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
