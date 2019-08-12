import {
  ModelType,
} from '../models/ModelType';

export type NoPortal<T extends ModelType> = Exclude<T, ModelType.Portal>;
