import {
  DebugDataIterator,
} from '../../../src/plugins/debug/DebugDataIterator';
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

export interface IDebugTreeViewOwnProps extends IClassNameable {
  readonly data: SerializableDataTypes;
  readonly dataIterator: DebugDataIterator<SerializableDataTypes>;
  readonly nodeName: string;
  readonly expandPaths?: string[];
  readonly expandLevel?: number;
  readonly handleValueChange?: ValueChangeHandler;
  readonly nodeRenderer?: ComponentType<IDebugNodeRendererOwnProps>;
}
