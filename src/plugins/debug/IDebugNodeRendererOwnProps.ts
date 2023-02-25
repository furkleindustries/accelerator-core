import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  SerializableDataTypes,
} from '../../../src/state/SerializableDataTypes';
import {
  ValueChangeHandler,
} from '../../state/ValueChangeHandler';

export interface IDebugNodeRendererOwnProps extends IClassNameable {
  readonly data: SerializableDataTypes;
  readonly depth: number;
  readonly nodeName: string;
  readonly path: string;
  readonly className?: string;
  readonly expanded?: boolean;
  readonly handleValueChange?: ValueChangeHandler;
  readonly isNonenumerable?: boolean;
  readonly shouldShowArrow?: boolean;
}
