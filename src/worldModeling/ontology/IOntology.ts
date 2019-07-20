import {
  IAdjacencyRelation,
} from '../relations/IAdjacencyRelation';
import {
  IContainmentRelation,
} from '../relations/IContainmentRelation';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IOntology<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly adjacency: IAdjacencyRelation<Type, Being, Knowledge>;
  readonly containment: IContainmentRelation<
    /* Do not allow portals to contain anything. */
    Exclude<Type, ModelType.Portal>,
    Being,
    Knowledge
  >;

  readonly tags: ReadonlyArray<string | Tag>;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly clone: () => IOntology<Type, Being, Knowledge>;
  readonly destroy: () => void;
  readonly removeTag: (tag: Tag) => void;
}
