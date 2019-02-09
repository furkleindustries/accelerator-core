/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* Accelerator components, interfaces, functions, etc. Feel free to destructure
 * these as you see fit. */
import * as components from '../../src/passages/componentsBundle'; 
import * as passages from '../../src/passages/passagesBundle';
import * as tags from '../../src/passages/tagsBundle';

/* Import the passage style. See css-modules.d.ts for types. */
import styles from './sample-passage.scss';

/* Import the built-in styles. These are bare-minimum defaults that are meant
 * to be overridden by authors. */
import builtInStyles from '../../src/passages/styles.scss';

/* Images (see images.d.ts for allowed types) are imported as URLs to
 * the file in the public/ directory. */
import logo from '../../public/logo.svg';

class Component extends React.PureComponent<passages.IPassageProps> {
  constructor(props: any) {
    super(props);

    /* Bind the function so we can properly access this.props. */
    this.clickIncrementor = this.clickIncrementor.bind(this);
  }

  public render() {
    const {
      bookmark,
      passageObject,
      storyState: {
        counter,
        cycleVar,
      },
    } = this.props;

    return (
      /* The title will appear above here as an <h1> if you've set it. */
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

        <button
          className={`${styles.button} ${styles.counter}`}
          /* Set the click handler of the element to execute the component's
           * clickIncrementor method. If the .bind() call in the constructor
           * is not performed, `this` will be undefined when the click handler
           * executes. */
          onClick={this.clickIncrementor}
        >
          Clicking this button will update the counter below.
        </button>

        {/* This will update reactively, without the need for any rendering
          * logic on your part. */}
        <p className={styles.paragraph}>
          <em>{counter || 0}</em>
        </p>

        <components.CyclingLink
          /* Set the value of the cycleVar variable to the current state of
           * the cycling link. */
          variableToSet="cycleVar"
          className={builtInStyles.link}
        >{
          /* Children should be an array of strings. */
          [
            'This is a cycling link.',

            'You can click it to change a value between several blocks of ' +
              'text.',

            'Each time the link changes, it updates the `cycleVar` variable ' +
              'to reflect the current value of the link.',

            'You can set any variable through the variableToSet property.',
          ]
        }</components.CyclingLink>

        <p className={styles.paragraph}>
          {/* This value updates automatically to match the cycling link
            * choice. */}
          <em className={styles.cycleVar}>
            {cycleVar}
          </em>
        </p>

        <p className={styles.paragraph}>
          <button
            className={builtInStyles.link}
            onClick={bookmark}
          >
            If you click this, it sets a bookmark.
          </button>
        </p>
      </article>
    );
  }

  private clickIncrementor() {
    const {
      setStoryState,
      storyState: { counter },
    } = this.props;

    const newVal = (counter || 0) + 1;
    setStoryState({ counter: newVal });
  }
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

    {
      key: 'anotherTag',
      value: 'anotherTagValue',
    },
  ],

  /* ComponentClass | SFC: the content that should be displayed. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
