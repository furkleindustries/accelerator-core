import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  ModelType,
} from '../models/ModelType';

export const isOnticType = (maybe: any): maybe is OnticTypes => {
  return Boolean(
    maybe === ModelType.Actor ||
      maybe === ModelType.Location ||
      maybe === ModelType.Object ||
      maybe === ModelType.Portal
  );
};
