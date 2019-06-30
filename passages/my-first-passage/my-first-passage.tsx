/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

/* A small utility function to simplify formatting class names. */
import classnames from 'classnames';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit. */
import * as passages from '../../bundles/passagesBundle';

import builtInStyles from '../_global-styles/built-ins.less';
import styles from './my-first-passage.less';

const Passage: React.FunctionComponent<passages.IPassageProps> = () => (
  <div
    className={classnames(
      'passage',
      builtInStyles.passage,
      styles['my-first-passage'],
    )}
  >
    This is the second passage.
  </div>
);

const passage: passages.IPassage = {
  /* string: the story-unique name of the passage. */
  name: 'my-first-passage',

  /* Tag[]: an optional collection of either plain strings or
   * { key: string, value: string, } objects. */
  tags: [],

  /* React.ComponentType<IPassageProps>: the content that should be displayed,
   * or, in the case of noRender passages, a component that can be imported.
   * Should be formatted in JSX style. */
  content: Passage,
};

/* Always make the passage object a default export. */
export default passage;
