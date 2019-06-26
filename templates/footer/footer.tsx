/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import classnames from 'classnames';

import * as components from '../../bundles/componentsBundle';
import * as passages from '../../bundles/passagesBundle';
import * as tagsBundle from '../../bundles/tagsBundle';

import builtInStyles from '../_global-styles/built-ins.less';
import styles from './{{{name}}}.less';

/* The footer gets all the same props as a normal passage. */
class Footer extends React.PureComponent<passages.IPassageProps> {
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
      <components.Footer
        className={classnames(
          'footer',
          styles['{{{name}}}'],
          builtInStyles.footer,
        )}
      >
      </components.Footer>
    );
  }
}

const footer: passages.IFooter = {
  /* string: the name of the footer. */
  name: '{{{name}}}',
  
  /* React.ComponentType<IPassageProps>: the content that should be displayed.
   * Should be formatted in JSX style. */
  content: Footer,
};

/* Always make the passage object a default export. */
export default footer;
