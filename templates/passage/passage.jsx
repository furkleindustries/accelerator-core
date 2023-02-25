/* This can't be removed as it must be in scope for rewriting JSX to JS. */ 
import * as React from 'react';

import classNames from 'classnames';

/* Accelerator components, interfaces, styles, functions, etc. Feel free to
 * destructure this as you see fit but watch out that you don't get mixed up
 * between bundle props and component props with the same name (e.g. tags). */
import * as components from '../../bundles/componentsBundle';

/* You may leave the @ts-ignore directive here, remove it if you want compiler
 * errors should you not remove it from a passage which does not use the
 * passages bundle, or remove both if you have no intention of ever using the
 * bundle. */
// @ts-ignore
import * as passages from '../../bundles/passagesBundle';

/* You may leave the @ts-ignore directive here, remove it if you want compiler
 * errors should you not remove it from a passage which does not use the tags
 * bundle, or remove both if you have no intention of ever using tags. */
// @ts-ignore
import * as tags from '../../bundles/tagsBundle';

import builtIns from '../../passages/_global-styles/components/index.less';
import styles from './{{{name}}}.less';

const Passage = ({
  children,
  ...props
}) => (
  <div
    className={classnames(
      builtIns.passage,
      styles['{{{name}}}'],
      'passage',
    )}

    role="group"
  >
    
  </div>
);

export default {
  /* string: the story-unique name of the passage. */
  name: '{{{name}}}',

  /* array: an optional collection of either plain strings or
   * { key: string, value: string } (Tag) objects. */
  tags: [],

  /* React component with a props signature of IPassageProps: the content that
   * should be displayed, or, in the case of NoRender passages, a component
   * that can be imported. Should be formatted in JSX style. */
  content: Passage,
};
