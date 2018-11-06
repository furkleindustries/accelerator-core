/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit but watch out that you don't get mixed up
 * between bundle props and component props with the same name (e.g. tags). */
import * as components from '../../src/passages/componentsBundle'; 
import * as passages from '../../src/passages/passagesBundle';
import * as tagsBundle from '../../src/passages/tagsBundle';
// @ts-ignore
import builtInStyles from '../../src/passages/styles.scss';

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
      storyState,
    } = this.props;

    return (
      /* The title will appear above here as an <h1> if you've set it. */
      <div id={passageObject.name}>
        <h2>
          This is the sample accelerator passage.
        </h2>

        <img
          /* Images are imported as filepaths and will automatically be
           * copied into the build directory by the build system. */
          src={logo}
          /* This should ordinarily be done in .scss/.css files, but this is a
           * compact example. */
          style={{
            display: 'block',
            width: '300px',
            margin: '0 auto',
            maxWidth: '60%',
          }}
        />

        {/* Move to new passages with the Link component. */}
        <components.Link
          className={builtInStyles.link}
          passageName="testPassage2">
          This is a link.
        </components.Link>


        <button
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
        <div>{storyState.counter || 0}</div>

        <components.CyclingLink
          choices={[ 'one', 'two', 'three', ]}
          variableToSet="cycleVar"
        />

        {/* This value updates automatically to match the cycling link
          * choice. */}
        <div>{storyState.cycleVar}</div>
      </div>
    );
  }

  private clickIncrementor() {
    const {
      setStoryState,
      storyState,
    } = this.props;

    setStoryState({
      counter: (storyState.counter || 0) + 1,
    });
  }
}

const passage: passages.IPassage = {
  /* string: the story-unique name of the passage. */
  name: 'myPassage',
  
  /* string: an optional expanded title to be used as you see fit. */
  title: 'My cool passage',
  
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

  /* ComponentClass | ReactElement: the content that should be displayed, or,
   * in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
