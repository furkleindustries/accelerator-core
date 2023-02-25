import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IDebugNodeRendererOwnProps,
} from '../../plugins/debug/IDebugNodeRendererOwnProps';
import type {
  ComponentType,
  MouseEvent,
  ReactNode,
} from 'react';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';
import {
  ValueChangeHandler,
} from '../../state/ValueChangeHandler';

export interface IDebugTreeNodeOwnProps extends IClassNameable {
  readonly data: SerializableDataTypes;
  readonly expanded: boolean;
  readonly nodeName: string;
  readonly path: string;
  readonly children?: ReactNode;
  readonly depth?: number;
  readonly handleValueChange?: ValueChangeHandler;
  readonly isNonenumerable?: boolean;
  readonly nodeRenderer?: ComponentType<IDebugNodeRendererOwnProps>;
  readonly onClick?: (event: MouseEvent) => void;
  readonly shouldShowArrow?: boolean;
  readonly title?: string;
}
