/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* A small utility function to simplify formatting class names. */
import classnames from 'classnames';

/* Accelerator components, interfaces, functions, etc. Feel free to destructure
 * these as you see fit. */
import {
  Button,
  Card,
  CyclingLink,
  Link,
  Typography,
} from '../../bundles/componentsBundle'; 
import {
  IPassage,
  IPassageProps,
} from '../../bundles/passagesBundle';
import {
  BuiltInTags,
} from '../../bundles/tagsBundle';

/* Import the passage style. See css-modules.d.ts for types. */
import styles from './sample-passage.less';

/* Import the built-in styles. These are bare-minimum defaults that are meant
 * to be overridden by authors. */
import builtInStyles from '../_global-styles/built-ins.less';

/* Images (see images.d.ts for allowed types) are imported as URLs to
 * the file in the public/ directory. */
import logo from '../../public/logo.svg';

class Passage extends React.PureComponent<IPassageProps> {
  /* Use arrow functions so the methods autobind. */
  public render = () => {
    const {
      bookmark,
      passageObject,
      storyState: {
        counter,
        cycleVar,
        soundLoaded,
        soundPlaying,
      },
    } = this.props;

    return (
      <article
        className={classnames(
          'passage',
          builtInStyles.passage,
          passageObject.name,
        )}
      >
        <section className={builtInStyles.section}>
          <Typography
            paragraph={true}
            variant="headline"
          >
            This is the sample Accelerator passage.
          </Typography>

          <Card className={styles.imageCard}>
            <img
              className={classnames(styles.image)}
              /* See note above on logo import. */
              src={logo}
            />
          </Card>
        </section>

        <section className={classnames(builtInStyles.section)}>
          <Typography>
            {/* Move to new passages with the Link component. */}
            <Link
              /* Use the built in style for links. This is opt-in because it should
              * be as easy as possible to do without default framework styling. */
              className={classnames(builtInStyles.link)}
              passageName="my-first-passage"
            >
              This is a link. Try creating a new passage with

              <Typography component="div">
                <Typography
                  component="pre"
                  style={{
                    fontFamily: 'Consolas, Inconsolata, Courier, monospace',
                  }}
                >
                  accelerator-tool new passage my-first-passage
                </Typography>
              </Typography>

              and clicking on the link.
            </Link>
          </Typography>
        </section>

        <section className={classnames(builtInStyles.section)}>
          <Button
            className={classnames(styles.counterButton)}
            /* Set the click handler of the element to execute the component's
             * clickIncrementor method. */
            onClick={this.clickIncrementor}
          >
            Clicking this button will update the counter below.
          </Button>

          <Typography
            /* This element will update reactively, without the need for any rendering
             * logic on your part. */
            component="em"
          >
            {counter || 0}
          </Typography>
        </section>

        <section className={classnames(builtInStyles.section)}>

          <Card
            className={styles.cyclingLinkCard}
            header="This is a cycling link."
            headerTypographyProps={{ variant: 'title' }}
          >
            <Typography paragraph={true}>
              <CyclingLink
                /* Set the value of the cycleVar variable to the current state of
                * the cycling link. */
                variableToSet="cycleVar"
              >{[
                /* Children should be an array of strings. */
                'You can click it to change a value between several blocks of ' +
                  'text.',

                'Each time the link changes, it updates the `cycleVar` variable ' +
                  'to reflect the current value of the link.',

                'You can set any variable through the variableToSet property.',
              ]}</CyclingLink>
            </Typography>

            <Typography>
              <Typography paragraph={true}>
                This value updates automatically to match the cycling link choice.
              </Typography>

              <Typography component="em">
                {cycleVar}
              </Typography>
            </Typography>
          </Card>
        </section>

        <section className={classnames(builtInStyles.section)}>
          <Typography paragraph={true}>
            <Button
              className={classnames(builtInStyles.link)}
              onClick={bookmark}
            >
              If you click this, it sets a bookmark.
            </Button>
          </Typography>
        </section>

        <section className={classnames(builtInStyles.section)}>
          <Typography>
            <Button
              className={classnames(builtInStyles.link)}
              onClick={this.toggleSampleSound}
              {
                /* Disable the button until the sound is loaded. */
                ...(soundLoaded ? {} : { disabled: true })
              }
            >{soundPlaying ?
              'Pause sound' :
              'Play sound'
            }</Button>
          </Typography>
        </section>
      </article>
    );
  };

  private soundName = 'sample';

  public readonly componentDidMount = () => {
    const {
      setStoryState,
      soundManager: {
        collection: {
          addSound,
          hasSound,
        },
      },
    } = this.props;

    if (hasSound(this.soundName)) {
      setStoryState({ soundLoaded: true });
    } else {
      /* TODO: add some sort guard against adding multiple identical sounds at the same time. */
      addSound(
        this.soundName,
        'https://s3.amazonaws.com/furkleindustries-accelerator/Zymbel_The_Real_Horst-1113884951.mp3',
      ).then(
        () => setStoryState({ soundLoaded: true }),
        (err) => { throw err; },
      );
    }
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
      setStoryState,
      soundManager: {
        collection: { getSound },
      },
    } = this.props;

    const {
      isPlaying,
      pause,
      play,
    } = getSound('sample');

    if (isPlaying()) {
      pause();
      setStoryState({ soundPlaying: false });
    } else {
      play().then(() => setStoryState({ soundPlaying: false }));
      setStoryState({ soundPlaying: true });
    }
  };
}

const passage: IPassage = {
  /* string: the story-unique name of the passage. */
  name: 'sample-passage',

  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } Tag objects. */
  tags: [
    /* Mark the passage as the first that should be rendered when the story is
     * started. */
    BuiltInTags.Start,

    /* Tags can also be added as key-value pairs. */
    {
      key: 'anotherTag',
      value: 'anotherTagValue',
    },
  ],

  /* React.ComponentType<IPassageProps>: the content that should be
   * displayed. */
  content: Passage,
};

/* Always make the passage object a default export. */
export default passage;
