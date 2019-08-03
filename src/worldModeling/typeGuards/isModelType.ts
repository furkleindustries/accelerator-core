import {
  ModelType,
} from '../models/ModelType';

export const isModelType = (maybe: any): maybe is ModelType => (
  Object.values(ModelType).includes(maybe)
);
