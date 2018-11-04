/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import * as bundle from '../../src/passages/bundle';

// @ts-ignore
import _styles from './%NAME%.scss';
const styles = _styles || {};

/* The footer gets all the same props as a normal passage. */
class Component extends React.PureComponent {
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
        className={`${styles[passageObject.name]} ${bundle.styles.footer} footer`}
      >
      </div>
    );
  }
}

const footer = {
  /* string: the name of the footer. */
  name: '%NAME%',
  
  /* ComponentClass<IPassageProps, any> | SFCFactory<IPassageProps>:
   * the content that should be displayed. Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default footer;
