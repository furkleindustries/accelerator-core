import {
  DebugNodeRenderer,
} from '../../plugins/debug/DebugNodeRenderer';
import {
  IDebugTreeNodeOwnProps,
} from './IDebugTreeNodeOwnProps';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

export const DebugTreeNode = React.memo<IDebugTreeNodeOwnProps>(({
  children,
  className,
  data,
  depth = 0,
  expanded = true,
  isNonenumerable,
  handleValueChange,
  nodeName,
  nodeRenderer: NodeRenderer = DebugNodeRenderer,
  onClick,
  path,
  shouldShowArrow,
  title,
}) => (
  <ListItem
    aria-expanded={expanded}
    role="treeitem"
    title={title}
  >
    <Typography
      component="span"
      onClick={onClick}
      role="region"
      variant="body2"
    >
      <NodeRenderer
        className={className}
        data={data}
        depth={depth}
        expanded={expanded}
        isNonenumerable={isNonenumerable}
        handleValueChange={handleValueChange}
        nodeName={nodeName}
        path={path}
        shouldShowArrow={Boolean(
          shouldShowArrow || React.Children.count(children)
        )}
      />
    </Typography>

    <List role="treeitem">
      {expanded ? children as any : null}
    </List>
  </ListItem>
));

DebugTreeNode.displayName = 'DebugTreeNode';
