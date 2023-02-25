import classNames from 'classnames';
import {
  DebugConnectedTreeNode,
} from '../DebugConnectedTreeNode';
import {
  DebugExpandedPathsContext,
} from '../../plugins/debug/DebugExpandedPathsContext';
import {
  defaultRootPath,
  getExpandedPaths,
} from '../../plugins/debug/debugPathUtils';
import {
  IDebugTreeViewOwnProps,
} from './IDebugTreeViewOwnProps';
import {
  List,
} from '../List';

import * as React from 'react';

export const DebugTreeView: React.NamedExoticComponent<
  IDebugTreeViewOwnProps
> = React.memo<IDebugTreeViewOwnProps>(
  ({
    className,
    data,
    dataIterator,
    expandPaths,
    handleValueChange,
    expandLevel,
    nodeName,
    nodeRenderer,
  }) => {
    const stateAndSetter = React.useState<string[]>([]);
    const [
      ,
      setExpandedPaths,
    ] = stateAndSetter;

    React.useEffect(
      () => (
        setExpandedPaths((prevExpandedPaths) => (
          getExpandedPaths({
            data,
            dataIterator,
            expandLevel,
            expandPaths,
            prevExpandedPaths,
          })
        ))
      ),

      [
        data,
        dataIterator,
        expandPaths,
        expandLevel,
      ],
    );

    return (
      <DebugExpandedPathsContext.Provider value={stateAndSetter}>
        <List
          className={classNames(
            'debug-tree-view',
            className,
          )}

          ordered={true}
          role="tree"
        >
          <DebugConnectedTreeNode
            data={data}
            dataIterator={dataIterator}
            depth={0}
            handleValueChange={handleValueChange}
            nodeName={nodeName}
            nodeRenderer={nodeRenderer}
            path={defaultRootPath}
          />
        </List>
      </DebugExpandedPathsContext.Provider>
    );
  },
);

DebugTreeView.displayName = 'DebugTreeView';
