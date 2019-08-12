import {
  ContainingTypes,
} from '../relations/ContainingTypes';
import {
  ModelType,
} from '../models/ModelType';

export const isEpistemicType = (maybe: any): maybe is ContainingTypes => {
  return Boolean(
    maybe === ModelType.Actor
  );
};
