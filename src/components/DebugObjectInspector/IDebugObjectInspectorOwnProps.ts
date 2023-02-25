import {
  DebugDataIterator,
} from '../../../src/plugins/debug/DebugDataIterator';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IDebugNodeRendererOwnProps,
} from '../../../src/plugins/debug/IDebugNodeRendererOwnProps';
import type {
  ComponentType,
} from 'react';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';
import {
  ValueChangeHandler,
} from '../../state/ValueChangeHandler';

export interface IDebugObjectInspectorOwnProps extends IClassNameable {
  readonly data: Record<any, any>;
  readonly dataIterator?: DebugDataIterator<SerializableDataTypes>;
  readonly expandLevel?: number;
  readonly expandPaths?: string[];
  readonly handleValueChange?: ValueChangeHandler;
  readonly nodeName?: string;
  readonly nodeRenderer?: ComponentType<IDebugNodeRendererOwnProps>;
  readonly showNonenumerable?: boolean;
  readonly sortObjectKeys?: boolean;
}
