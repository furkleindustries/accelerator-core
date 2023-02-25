import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';
import {
  ValueChangeHandler,
} from '../../state/ValueChangeHandler';

export interface IDebugObjectValueOwnProps {
  readonly data: SerializableDataTypes;
  readonly path: string;
  readonly handleValueChange?: ValueChangeHandler;
}
