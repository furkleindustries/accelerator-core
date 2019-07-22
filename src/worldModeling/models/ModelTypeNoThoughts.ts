import {
  ModelType,
} from './ModelType';

export type ModelTypeNoThoughts<
  Type extends ModelType,
> = Exclude<Type, ModelType.Thought>;
