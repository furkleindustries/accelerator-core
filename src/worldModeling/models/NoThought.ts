import {
  ModelType,
} from './ModelType';

export type NoThought<T extends ModelType> = Exclude<T, ModelType.Thought>;
