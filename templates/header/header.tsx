/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import * as passages from '../../src/passages/passagesBundle';
// @ts-ignore
import builtInStyles from '../../src/passages/styles.scss';

// @ts-ignore
import _styles from './%NAME%.scss';
const styles = _styles || {};

/* The header gets all the same props as a normal passage. */
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
      <div
        className={`${styles[passageObject.name]} ${builtInStyles.header} header`}
      >
      </div>
    );
  }
}

const passage: passages.IHeader = {
  /* string: the name of the header. */
  name: '%NAME%',

  /* ComponentClass<IPassageProps, any> | SFCFactory<IPassageProps>:
   * the content that should be displayed. Should be formatted in JSX style. */
  contents: Component,
};

/* Always make the passage object a default export. */
export default passage;
