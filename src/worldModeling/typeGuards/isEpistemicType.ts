import {
  ContainmentTypes,
} from '../relations/ContainmentTypes';
import {
  ModelType,
} from '../models/ModelType';

export const isEpistemicType = (maybe: any): maybe is ContainmentTypes => {
  return Boolean(
    maybe === ModelType.Actor
  );
};
