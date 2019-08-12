import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IRelationConstructorArgs<Type extends ModelType> {
  readonly modelType: Type;
  readonly tags?: MaybeReadonlyArray<Tag>;
}
