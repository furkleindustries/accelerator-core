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
  OnticTypes,
} from './OnticTypes';
import {
  Tag,
} from '../../tags/Tag';

export interface IOntology<
  Type extends OnticTypes,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> {
  readonly adjacency: IAdjacencyRelation<Type, Being, Knowledge>;

  readonly containment: Type extends ModelType.Portal ?
    null :
    Being extends ModelType.Portal ?
      /* Do not allow portals to have containment relations. */
      null :
      IContainmentRelation<
        /* Do not allow portals to have containment relations. */
        Exclude<Type, ModelType.Portal>,

        /* Only allow objects to contain actors and objects. */
        Being extends ModelType.Object ?
          /* Do not allow objects to contain locations or portals. */
          Exclude<Being, ModelType.Location | ModelType.Portal> :
          /* Do not allow portals or thoughts to be contained as models. */
          Being,

        Knowledge
      >;

  readonly tags: ReadonlyArray<string | Tag>;
  readonly world: IWorld;

  readonly addTag: (tag: Tag) => void;
  readonly clone: () => IOntology<Type, Being, Knowledge>;
  readonly destroy: () => void;
  readonly finalize: (self: IOntology<Type, Being, Knowledge>) => void;
  readonly initialize: (self: IOntology<Type, Being, Knowledge>) => void;
  readonly removeTag: (tag: Tag) => void;
}
