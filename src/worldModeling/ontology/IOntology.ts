import {
  ContainmentTypes,
} from '../relations/ContainmentTypes';
import {
  IAdjacencyRelation,
} from '../relations/IAdjacencyRelation';
import {
  IContainmentRelation,
} from '../relations/IContainmentRelation';
import {
  ITag,
} from '../../tags/ITag';
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
> {
  readonly adjacency: IAdjacencyRelation<Type, Being>;

  readonly containment: Type extends ContainmentTypes ?
    IContainmentRelation<
      /* Do not allow portals to have containment relations. */
      ContainmentTypes,

      /* Only allow objects to contain actors and objects. */
      Being extends ModelType.Object ?
        /* Do not allow objects to contain locations or portals. */
        Exclude<Being, ModelType.Location | ModelType.Portal> :
        /* Do not allow portals or thoughts to be contained as models. */
        Being
    > :
    null;

  readonly modelType: Type;

  readonly tags: ReadonlyArray<ITag>;
  readonly world: IWorld;

  readonly addTag: (tag: Tag) => void;
  readonly clone: () => IOntology<Type, Being>;
  readonly destroy: () => void;
  readonly getTag: (toSearch: Tag) => ITag | null;
  readonly removeTag: (tag: Tag) => void;
  readonly finalize?: (self: IOntology<Type, Being>) => void;
  readonly initialize?: (self: IOntology<Type, Being>) => void;
}
