import classNames from 'classnames';
import {
  IDebugObjectRootLabelOwnProps,
} from './IDebugObjectRootLabelOwnProps';
import {
  DebugObjectName,
} from '../DebugObjectName';

import * as React from 'react';

export const DebugObjectRootLabel: React.FC<IDebugObjectRootLabelOwnProps> = ({
  className,
  nodeName,
}) => (
  <>
    <DebugObjectName
      className={classNames(
        'debug-object-root-label',
        className,
      )}

      depth={0}
      nodeName={nodeName}
    />
  </>
);
