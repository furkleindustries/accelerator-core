/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import * as components from '../../src/passages/componentsBundle';
import * as passages from '../../src/passages/passagesBundle';
import * as tagsBundle from '../../src/passages/tagsBundle';
// @ts-ignore
import builtInStyles from '../../src/passages/styles.scss';

// @ts-ignore
import _styles from './%NAME%.scss';
const styles = _styles || {};

/* The footer gets all the same props as a normal passage. */
class Component extends React.PureComponent<passages.IPassageProps> {
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
      <footer
        className={`${styles['%NAME%']} ${builtInStyles.footer} footer`}
      >
      </footer>
    );
  }
}

const footer: passages.IFooter = {
  /* string: the name of the footer. */
  name: '%NAME%',
  
  /* ComponentClass<IPassageProps, any> | SFCFactory<IPassageProps>:
   * the content that should be displayed. Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default footer;
