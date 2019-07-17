import {
  IContainmentRelation,
} from './relations/IContainmentRelation';
import {
  IWorld,
} from './IWorld';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../tags/Tag';

export interface IOntology<T extends ModelType> {
  readonly contains: IContainmentRelation<T>;
  readonly tags: ReadonlyArray<Tag>;
  readonly world: IWorld;
}
