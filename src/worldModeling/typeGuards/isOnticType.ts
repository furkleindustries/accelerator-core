import {
  ContainmentTypes,
} from '../relations/ContainmentTypes';
import {
  ModelType,
} from '../models/ModelType';

export const isOnticType = (maybe: any): maybe is ContainmentTypes => {
  return Boolean(
    maybe === ModelType.Actor ||
      maybe === ModelType.Location ||
      maybe === ModelType.Object ||
      maybe === ModelType.Portal
  );
};
