import {
  ModelType,
} from '../models/ModelType';

export type NoLocation<T extends ModelType> = Exclude<T, ModelType.Location>;
