import {
  getBaseMarkdownComponents,
} from './getBaseMarkdownComponents';
import {
  IAuthoringPassageContainerOwnProps,
} from './IAuthoringPassageContainerOwnProps';
import {
  MDXProvider,
// @ts-ignore
} from '@mdx-js/react';

import * as React from 'react';

const baseMarkdownComponents = getBaseMarkdownComponents();

export const AuthoringPassageContainer: React.FunctionComponent<IAuthoringPassageContainerOwnProps> = ({
  children,
  components,
  noBuiltInComponents,
  passageProps,
}) => {
  type Val = { children: (...args: any[]) => React.ReactElement };
  const ContextWrapper = ({ children }: Val) => children({ ...passageProps });
  const comps = noBuiltInComponents ?
    {
      ContextWrapper,
      /* Note for users of noBuiltInComponents: this, for better and worse,
       * allows you to override ContextWrapper as well. */
      ...components,
    } :
    {
      ...baseMarkdownComponents,
      ...components,
      ContextWrapper,
    };

  return (
    <MDXProvider components={comps}>
      {children}
    </MDXProvider>
  );
};
