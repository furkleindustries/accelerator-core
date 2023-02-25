import {
  SerializableDataTypes,
} from './SerializableDataTypes';

export type ValueChangeHandler = (
  data: SerializableDataTypes,
  path: string,
) => void;
