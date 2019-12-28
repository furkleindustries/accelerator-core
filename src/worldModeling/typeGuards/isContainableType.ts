import {
  ContainableTypes,
} from '../relations/ContainableTypes';
import {
  ModelType,
} from '../models/ModelType';

export const isContainableType = (maybe: any): maybe is ContainableTypes => {
  return Boolean(
    maybe === ModelType.Actor ||
      maybe === ModelType.Object ||
      maybe === ModelType.Portal
  );
};
