import {
  SerializableValue,
} from '../typeAliases/SerializableValue';

export interface ITag {
  readonly key: string;
  readonly value: SerializableValue;
}
