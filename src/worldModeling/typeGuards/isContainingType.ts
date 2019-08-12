import {
  ContainingTypes,
} from '../relations/ContainingTypes';
import {
  ModelType,
} from '../models/ModelType';

export const isContainingType = (maybe: any): maybe is ContainingTypes => {
  return Boolean(
    maybe === ModelType.Actor ||
      maybe === ModelType.Location ||
      maybe === ModelType.Object
  );
};
