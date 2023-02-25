import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';
import {
  ValueChangeHandler,
} from '../../state/ValueChangeHandler';

export interface IDebugObjectPreviewOwnProps extends IClassNameable {
  readonly data: SerializableDataTypes;
  readonly depth: number;
  readonly path: string;
  readonly handleValueChange?: ValueChangeHandler;
}
