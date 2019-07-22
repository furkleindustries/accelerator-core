import {
  ModelType,
} from '../models/ModelType';

export type OnticTypes = Exclude<ModelType, ModelType.Thought>;
