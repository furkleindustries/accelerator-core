import classNames from 'classnames';
import {
  createDebugNodeIterator,
} from '../../plugins/debug/createDebugNodeIterator';
import {
  DebugNodeRenderer,
} from '../../plugins/debug/DebugNodeRenderer';
import {
  IDebugObjectInspectorOwnProps,
} from './IDebugObjectInspectorOwnProps';
import {
  DebugTreeView,
} from '../DebugTreeView';

import * as React from 'react';

export const DebugObjectInspector: React.FC<IDebugObjectInspectorOwnProps> = ({
  className,
  data,
  expandLevel,
  expandPaths,
  handleValueChange,
  nodeRenderer = DebugNodeRenderer,
  nodeName,
  showNonenumerable = false,
  sortObjectKeys = false,
  dataIterator = createDebugNodeIterator(showNonenumerable, sortObjectKeys),
}) => (
  <DebugTreeView
    className={classNames(
      'debug-object-inspector',
      className,
    )}

    data={data}
    dataIterator={dataIterator}
    expandPaths={expandPaths}
    expandLevel={expandLevel}
    handleValueChange={handleValueChange}
    nodeRenderer={nodeRenderer}
    nodeName={nodeName || ''}
  />
);
