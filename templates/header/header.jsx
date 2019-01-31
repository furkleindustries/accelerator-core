/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import * as components from '../../src/passages/componentsBundle';
import * as tagsBundle from '../../src/passages/tagsBundle';
import builtInStyles from '../../src/passages/styles.scss';

import styles from './%NAME%.scss';

/* The header gets all the same props as a normal passage. */
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
        className={`${styles['%NAME%']} ${builtInStyles.header} header`}
      >
      </div>
    );
  }
}

const passage = {
  /* string: the name of the header. */
  name: '%NAME%',

  /* ComponentClass<IPassageProps, any> | SFCFactory<IPassageProps>:
   * the content that should be displayed. Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
