import {
  DebugNodeArrow,
} from '../../components/DebugNodeArrow';
import {
  DebugObjectLabel,
} from '../../components/DebugObjectLabel';
import {
  DebugObjectRootLabel,
} from '../../components/DebugObjectRootLabel';
import {
  IDebugNodeRendererOwnProps,
} from './IDebugNodeRendererOwnProps';

import * as React from 'react';

export const DebugNodeRenderer: React.FC<
  IDebugNodeRendererOwnProps
> = ({
  className,
  data,
  depth,
  expanded = true,
  isNonenumerable = false,
  nodeName,
  path,
  shouldShowArrow,
}) => (
  <>
    {shouldShowArrow ?
      <DebugNodeArrow expanded={expanded} /> :
      null}

    {depth ?
      <DebugObjectLabel
        className={className}
        data={data}
        depth={depth}
        isNonenumerable={isNonenumerable}
        nodeName={nodeName}
        path={path}
      /> :
      <DebugObjectRootLabel
        className={className}
        nodeName="Engine state"
      />}
  </>
);
