import {
  DebugExpandedPathsContext,
} from '../../plugins/debug/DebugExpandedPathsContext';
import {
  hasChildNodes,
} from '../../plugins/debug/debugPathUtils';
import {
  IDebugConnectedTreeNodeOwnProps,
} from './IDebugConnectedTreeNodeOwnProps';
import {
  DebugTreeNode,
} from '../DebugTreeNode';

import * as React from 'react';

export const DebugConnectedTreeNode: React.NamedExoticComponent<
  IDebugConnectedTreeNodeOwnProps
> = React.memo<IDebugConnectedTreeNodeOwnProps>(({
  className,
  data,
  dataIterator,
  depth,
  handleValueChange,
  isNonenumerable,
  nodeName,
  nodeRenderer,
  path,
  title,
}) => {
  const [
    expandedPaths,
    setExpandedPaths,
  ] = React.useContext<any>(DebugExpandedPathsContext);

  const nodeHasChildNodes = hasChildNodes(data, dataIterator);
  const expanded = Boolean(expandedPaths[path]);

  const handleClick = React.useCallback(
    () => (
      nodeHasChildNodes &&
        setExpandedPaths((prevExpandedPaths: Record<string, boolean>) => ({
          ...prevExpandedPaths,
          [path]: !expanded,
        }))
    ),

    [
      nodeHasChildNodes,
      setExpandedPaths,
      path,
      expanded,
    ],
  );

  return (
    <DebugTreeNode
      className={className}
      data={data}
      depth={depth}
      expanded={expanded}
      handleValueChange={handleValueChange}
      isNonenumerable={isNonenumerable}
      nodeName={nodeName}
      nodeRenderer={nodeRenderer}
      onClick={handleClick}
      path={path}
      shouldShowArrow={nodeHasChildNodes}
      title={title}
    >
      {expanded ?
        Array.from(dataIterator(data)).map(({
          data,
          isNonenumerable,
          nodeName,
        }) => (
          <DebugConnectedTreeNode
            data={data}
            dataIterator={dataIterator}
            depth={depth + 1}
            handleValueChange={handleValueChange}
            key={nodeName}
            isNonenumerable={isNonenumerable}
            path={`${path}.${nodeName}`}
            nodeName={nodeName}
            nodeRenderer={nodeRenderer}
            title={title}
          />
        )) :
        null}
    </DebugTreeNode>
  );
});
