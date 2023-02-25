import {
  DebugDataGenerator,
} from './DebugDataGenerator';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';

export type DebugDataIterator<T extends SerializableDataTypes> = (
  data: T,
) => DebugDataGenerator<T>;
