import {
  IModel,
} from '../models/IModel';
import {
  isModelType,
} from './isModelType';

export const isModel = (maybe: any): maybe is IModel<any, any, any> => Boolean(
  maybe &&
    typeof maybe === 'object' &&
    isModelType(maybe.type)
);
