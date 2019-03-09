/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* A small utility function to simplify formatting class names. */
import classnames from 'classnames';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit. */
import * as components from '../../bundles/componentsBundle'; 
import * as passages from '../../bundles/passagesBundle';
import * as tags from '../../bundles/tagsBundle';

import builtInStyles from '../../passages/_global-styles/built-ins.scss';
import styles from './my-first-passage.scss';

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
        className={classnames(
          'passage',
          builtInStyles.passage,
          styles['my-first-passage'],
        )}
      >
      </div>
    );
  }
}

const passage: passages.IPassage = {
  /* string: the story-unique name of the passage. */
  name: 'my-first-passage',
  
  /* Tag[]: an optional collection of either plain strings or
   * { key: string, value: string, } objects. */
  tags: [],

  /* React.ComponentType<IPassageProps>: the content that should be displayed,
   * or, in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  content: Passage,
};

/* Always make the passage object a default export. */
export default passage;
