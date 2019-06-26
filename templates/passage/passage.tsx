/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import classnames from 'classnames';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit. */
import * as components from '../../bundles/componentsBundle'; 
import * as passages from '../../bundles/passagesBundle';
import * as tags from '../../bundles/tagsBundle';

/**
 * The authoring passage is imported and rendered into the React passage.
 */
import AuthoringPassage from './passage.mdx';

import builtInStyles from '../_global-styles/built-ins.less';
import styles from './{{{name}}}.less';

const Passage: React.FunctionComponent<passages.IPassageProps> = (props) => {
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
        builtInStyles.passage,
        styles['{{{name}}}'],
        'passage',
      )}
    >
      <components.AuthoringPassageContainer value={props}>
        <AuthoringPassage />
      </components.AuthoringPassageContainer>
    </components.Article>
  );
};

const passage: passages.IPassage = {
  /* string: the story-unique name of the passage. */
  name: '{{{name}}}',
  
  /* Tag[]: an optional collection of either plain strings or
   * { key: string, value: string } (ITag) objects. */
  tags: [],

  /* React.ComponentType<IPassageProps>: the content that should be displayed,
   * or, in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  content: Passage,
};

/* Always make the passage object a default export. */
export default passage;
