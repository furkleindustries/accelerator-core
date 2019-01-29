/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure these as you see fit but watch out that you don't get mixed up
 * between bundle names and passage component props with the same name
 * (e.g. tags). */
import * as components from '../../src/passages/componentsBundle'; 
import * as passages from '../../src/passages/passagesBundle';
import * as tagsBundle from '../../src/passages/tagsBundle';

/* @ts-ignore tells the TypeScript linter to ignore the following line,
 * because TypeScript doesn't know how to type style imports.
 *
 * Import the passage style.
 */
// @ts-ignore
import _styles from './start.scss';
/* Make sure that styles is always an object, even if the import fails. */
const styles = _styles || {};

/* Import the built-in styles. These are bare-minimum defaults that are meant
 * to be overridden by authors. */
// @ts-ignore
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
      passageObject,
      storyState: {
        counter,
        cycleVar,
      },
    } = this.props;

    return (
      /* The title will appear above here as an <h1> if you've set it. */
      <div className={passageObject.name}>
        <h2>
          This is the sample Accelerator passage.
        </h2>

        <img
          /* See note above on logo import. */
          src={logo}
          style={styles.image}
        />

        {/* Move to new passages with the Link component. */}
        <components.Link
          /* Use the built in style for links. This is opt-in because it should
           * be as easy as possible to do without default framework styling. */
          className={builtInStyles.link}
          passageName="testPassage2"
        >
          This is a link.
        </components.Link>


        <button
          /* Set the click handler of the element to execute the component's
           * clickIncrementor method. If the .bind() call in the constructor
           * is not performed, `this` will be undefined when the click handler
           * executes. */
          onClick={this.clickIncrementor}
          style={{
            display: 'block',
            margin: '0 auto',
          }}
        >
          Clicking me increments the counter!
        </button>

        {/* This will update reactively, without the need for any rendering
          * logic on your part. */}
        <div style={{ marginBottom: '10px' }}>{counter || 0}</div>

        <components.CyclingLink
          className={builtInStyles.link}
          /* Choices should be an array of strings. */
          choices={[
            'one',
            'two',
            'three',
          ]}

          /* Set the value of the cycleVar variable to the current state of
           * the cycling link. */
          variableToSet="cycleVar"
        />

        {/* This value updates automatically to match the cycling link
          * choice. */}
        <div>{cycleVar}</div>
      </div>
    );
  }

  private clickIncrementor() {
    const {
      bookmark,
      setStoryState,
      storyState: { counter },
    } = this.props;

    /* Set a bookmark every 5 times the clicker is clicked. You may notice
     * that (assuming the ACCELERATOR_HISTORY_SAVE_TYPES value is the default),
     * the rewind button becomes usable. */ 
    if (counter % 5 === 0) {
      bookmark();
    }

    setStoryState({ counter: (counter || 0) + 1 });
  }
}

const passage: passages.IPassage = {
  /* string: the story-unique name of the passage. */
  name: 'myPassage',
  
  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } Tag objects. */
  tags: [
    /* Mark the passage as the first that should be rendered when the story is
     * started. */
    tagsBundle.BuiltInTags.Start,
  
    {
      key: 'anotherTag',
      value: 'anotherTagValue',
    },
  ],

  /* ComponentClass | SFC: the content that should be displayed, or,
   * in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
