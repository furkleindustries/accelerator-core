/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import classnames from 'classnames';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit but watch out that you don't get mixed up
 * between bundle props and component props with the same name (e.g. tags). */
import * as components from '../../src/passages/componentsBundle';
import * as tagsBundle from '../../src/passages/tagsBundle';

/**
 * The authoring passage is imported and rendered into the React passage.
 */
import AuthoringPassage from './passage.mdx';

import builtInStyles from '../../passages/_global-styles/built-ins.less';
import styles from './{{{name}}}.less';

const Passage = ({
  children,
  ...props
}) => {
  const {
    lastLinkTags,
    passageObject,
    navigateTo,
    restart,
    setStoryState,
    storyState,
  } = props;

  return (
    <components.Article
      className={classnames(
        'passage',
        styles['{{{name}}}'],
        builtInStyles.passage,
      )}
    >
      <components.AuthoringPassageContainer>
        <AuthoringPassage />
      </components.AuthoringPassageContainer>
    </components.Article>
  );
};

export default {
  /* string: the story-unique name of the passage. */
  name: '{{{name}}}',
  
  /* array: an optional collection of either plain strings or
   * { key: string, value: string } (ITag) objects. */
  tags: [],

  /* React.ComponentType<IPassageProps>: the content that should be displayed,
   * or, in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  content: Passage,
};
