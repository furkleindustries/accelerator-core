/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit but watch out that you don't get mixed up
 * between bundle props and component props with the same name (e.g. tags). */
import * as components from '../../src/passages/componentsBundle'; 
import * as tagsBundle from '../../src/passages/tagsBundle';
import builtInStyles from '../../passages/_global-styles/built-ins.scss';

import _styles from './%name%.scss';
const styles = _styles || {};

class Passage extends React.PureComponent {
  render() {
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

export default {
  /* string: the story-unique name of the passage. */
  name: '%name%',
  
  /* array: an optional collection of either plain strings or
   * { key: string, value: string, } objects. */
  tags: [],

  /* React.ComponentType<IPassageProps: the content that should be displayed,
   * or, in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  content: Passage,
};
