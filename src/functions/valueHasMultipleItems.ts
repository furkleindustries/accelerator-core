import {
  SerializableDataTypes,
} from '../state/SerializableDataTypes';

export const valueHasMultipleItems = <
  T extends [
    SerializableDataTypes,
    SerializableDataTypes,
    ...T
  ],
>(value: any): value is T => (
  // This is a very exhaustive check. Most are probably unnecessary in
  // practice.
  Boolean(
    value !== null &&
      value !== undefined &&
      'length' in value &&
      typeof value.length === 'number' &&
      !Number.isNaN(value.length) &&
      value.length > 1
  )
);
