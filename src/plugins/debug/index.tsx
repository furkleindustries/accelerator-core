import classNames from 'classnames';
import {
  IDebugNodeRendererOwnProps,
} from './IDebugNodeRendererOwnProps';
import {
  DebugObjectLabel,
} from '../../components/DebugObjectLabel';
import {
  DebugObjectRootLabel,
} from '../../components/DebugObjectRootLabel';

import * as React from 'react';

export const DebugNodeRenderer: React.FC<IDebugNodeRendererOwnProps> = ({
  className,
  data,
  depth,
  isNonenumerable = false,
  path,
  nodeName,
}) => (
  <div
    className={classNames(
      'debug-node-rendered-output',
      className,
    )}

    role="group"
  >
    {depth ?
      <DebugObjectLabel
        data={data}
        depth={depth}
        isNonenumerable={isNonenumerable}
        nodeName={nodeName}
        path={path}
      /> :
      <DebugObjectRootLabel nodeName={nodeName} />}
  </div>
);
