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
  replaceComponents,
  passageProps,
}) => {
  const ContextWrapper = ({
    children
  }: { children: (...args: any[]) => React.ReactElement }) => children({
    ...passageProps,
  });

  const comps = replaceComponents === true ?
    {
      ContextWrapper,
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
