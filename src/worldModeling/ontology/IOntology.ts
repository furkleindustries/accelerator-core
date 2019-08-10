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
  FindOnticArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  ISerializedOntology,
} from './ISerializedOntology';
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
import { IModel } from '../models/IModel';
import { ContainableTypes } from '../relations/ContainableTypes';

export interface IOntology<
  Type extends OnticTypes,
  Being extends OnticTypes,
> {
  readonly adjacency: IAdjacencyRelation<Type, Being>;

  readonly containment: Type extends (ContainableTypes | ContainmentTypes) ?
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
  readonly clone: (self: IOntology<Type, Being>) => IOntology<Type, Being>;
  readonly destroy: (self: IOntology<Type, Being>) => void;

  readonly find: <B extends Being, K extends ModelType>(
    args: string | IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, B, K>,
  ) => IModel<OnticTypes, B, ModelType> | null;

  readonly findAll: <B extends Being, K extends ModelType>(
    args: '*' | IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, B, K>,
  ) => ReadonlyArray<IModel<OnticTypes, B, ModelType>>;

  readonly findAllGenerator: <B extends Being, K extends ModelType>(
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, B, K>,
  ) => IterableIterator<IModel<OnticTypes, B, ModelType>>;

  readonly getTag: (toSearch: Tag) => ITag | null;
  readonly removeTag: (tag: Tag) => void;
  readonly serialize: (
    self: IOntology<Type, Being>,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (
    self: IOntology<Type, Being>,
  ) => ISerializedOntology;

  readonly finalize?: (self: IOntology<Type, Being>) => void;
  readonly initialize?: (self: IOntology<Type, Being>) => void;
}
