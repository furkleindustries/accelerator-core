/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit. */
import * as components from '../../src/passages/componentsBundle'; 
import * as passages from '../../src/passages/passagesBundle';
import * as tags from '../../src/passages/tagsBundle';

import builtInStyles from '../../passages/_global-styles/built-ins.scss';
import styles from './%name%.scss';

class Passage extends React.PureComponent<passages.IPassageProps> {
  public render() {
    const {
      lastLinkTags,
      passageObject,
      navigateTo,
      restart,
      setStoryState,
      storyState,
    } = this.props;

    return (
      <div
        className={`${styles['%name%']} ${builtInStyles.passage} passage`}
      >
      </div>
    );
  }
}

const passage: passages.IPassage = {
  /* string: the story-unique name of the passage. */
  name: '%name%',
  
  /* Tag[]: an optional collection of either plain strings or
   * { key: string, value: string, } objects. */
  tags: [],

  /* React.ComponentType<IPassageProps>: the content that should be displayed,
   * or, in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  contents: Passage,
};

/* Always make the passage object a default export. */
export default passage;
