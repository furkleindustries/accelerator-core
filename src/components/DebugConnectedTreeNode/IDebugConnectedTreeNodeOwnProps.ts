import {
  DebugDataIterator,
} from '../../plugins/debug/DebugDataIterator';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IDebugNodeRendererOwnProps,
} from '../../plugins/debug/IDebugNodeRendererOwnProps';
import type {
  ComponentType,
} from 'react';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';
import {
  ValueChangeHandler,
} from '../../state/ValueChangeHandler';

export interface IDebugConnectedTreeNodeOwnProps extends IClassNameable {
  readonly data: SerializableDataTypes;
  readonly dataIterator: DebugDataIterator<SerializableDataTypes>;
  readonly depth: number;
  readonly nodeName: string;
  readonly path: string;
  readonly handleValueChange?: ValueChangeHandler;
  readonly isNonenumerable?: boolean;
  readonly nodeRenderer?: ComponentType<IDebugNodeRendererOwnProps>;
  readonly title?: string;
}
