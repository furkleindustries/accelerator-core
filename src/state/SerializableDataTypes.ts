export type SerializableDataTypes = SerializableValueTypes |
  SerializableReferenceTypes;

export type SerializableValueTypes = boolean | null | number | string;

export type SerializableReferenceTypes =
  ArrayLike<SerializableValueTypes> |
    Iterable<SerializableValueTypes> |
    Array<SerializableValueTypes> |
    Record<any, SerializableValueTypes>;
