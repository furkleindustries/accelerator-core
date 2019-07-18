import {
  IAdjacencyRelation,
} from '../relations/IAdjacencyRelation';
import {
  IContainmentRelation,
} from '../relations/IContainmentRelation';
import {
  IWorld,
} from './IWorld';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IOntology<B extends ModelType> {
  readonly adjacency: IAdjacencyRelation<B>;
  readonly containment: IContainmentRelation<B>;
  readonly tags: ReadonlyArray<Tag>;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly removeTag: (tag: Tag) => void;
  readonly clone: () => IOntology<B>;
}
