/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import classNames from 'classnames';

import * as components from '../../bundles/componentsBundle';
import * as passages from '../../bundles/passagesBundle';
import * as tagsBundle from '../../bundles/tagsBundle';

import builtIns from '../../passages/_global-styles/components/index.less';
import styles from './{{{name}}}.less';

/* The header gets all the same props as a normal passage. */
class HeaderComponent extends React.PureComponent<passages.IPassageProps> {
  public render() {
    const {
      lastLinkTags,
      passage,
      navigateTo,
      restart,
      setStoryState,
      storyState,
    } = this.props;

    return (
      <components.Header
        className={classNames(
          styles['{{{name}}}'],
        )}
      >
      </components.Header>
    );
  }
}

const passage: passages.IHeader = {
  /* string: the name of the header. */
  name: '{{{name}}}',

  /* React.ComponentType<IPassageProps>: the content that should be displayed.
   * Should be formatted in JSX style. */
  content: HeaderComponent,
};

/* Always make the passage object a default export. */
export default passage;
