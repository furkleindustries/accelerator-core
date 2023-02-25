import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';

export type DebugDataGenerator<T extends SerializableDataTypes> = Generator<{
  readonly data: T;
  readonly nodeName: string;
  readonly isNonenumerable?: boolean;
}>;
