import {
  ModelType,
} from '../models/ModelType';

export type BeingNoThoughts<
  Being extends ModelType
> = Exclude<Being, ModelType.Thought>;
