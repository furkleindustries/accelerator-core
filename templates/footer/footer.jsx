/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import * as components from '../../src/passages/componentsBundle';
import * as tagsBundle from '../../src/passages/tagsBundle';
import builtInStyles from '../../../passages/_global-styles/built-ins.scss';

import styles from './%name%.scss';

/* The footer gets all the same props as a normal passage. */
class Footer extends React.PureComponent {
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
      <footer
        className={`${styles.%name%} ${builtInStyles.footer} footer`}
      >
      </footer>
    );
  }
}

/* Always make the passage object a default export. */
export default {
  /* string: the name of the footer. */
  name: '%name%',
  
  /* React.ComponentType<IPassageProps>: the content that should be displayed.
   * Should be formatted in JSX style. */
  contents: Footer,
};
