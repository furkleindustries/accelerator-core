import {
  ModelType,
} from '../models/ModelType';

export type ContainableTypes = Exclude<
  ModelType,
  ModelType.Portal | ModelType.Thought
>;
