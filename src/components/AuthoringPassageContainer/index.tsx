import {
  getTagNameToComponentMap,
} from '../../functions/getTagNameToComponentMap';
import {
  IAuthoringPassageContainerOwnProps,
} from './IAuthoringPassageContainerOwnProps';
import {
  MDXProvider,
// @ts-ignore
} from '@mdx-js/react';

import * as React from 'react';

const tagNameToComponentMap = getTagNameToComponentMap();

export const AuthoringPassageContainer: React.FunctionComponent<IAuthoringPassageContainerOwnProps> = ({
  children,
  components,
  noBuiltInComponents,
  passageProps,
}) => {
  interface Val { children: (...args: any[]) => React.ReactElement }
  const ContextWrapper = ({ children }: Val) => children({ ...passageProps });
  const comps = noBuiltInComponents ?
    {
      ContextWrapper,
      /* Note for users of noBuiltInComponents: this, for better and worse,
       * allows you to override ContextWrapper as well. */
      ...components,
    } :
    {
      ...tagNameToComponentMap,
      ...components,
      ContextWrapper,
    };

  return (
    <MDXProvider components={comps}>
      {children}
    </MDXProvider>
  );
};
