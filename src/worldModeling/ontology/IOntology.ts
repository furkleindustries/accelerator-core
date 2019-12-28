import {
  ContainingTypes,
} from '../relations/ContainingTypes';
import {
  ContainmentTypes,
} from '../relations/ContainmentTypes';
import {
  FindOnticArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  IAdjacencyRelation,
} from '../relations/IAdjacencyRelation';
import {
  IContainmentRelation,
} from '../relations/IContainmentRelation';
import {
  IModel,
} from '../models/IModel';
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
  NoLocation,
} from './NoLocation';
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
    IContainmentRelation<ContainingTypes, NoLocation<Being>> :
    null;

  readonly modelType: Type;

  readonly tags: ReadonlyArray<ITag>;
  readonly world: IWorld;

  readonly addTag: (tag: Tag) => void;
  readonly clone: (self: IOntology<Type, Being>) => IOntology<Type, Being>;
  readonly destroy: (self: IOntology<Type, Being>) => void;

  readonly find: (
    args: string |
      (IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>),
  ) => IModel<OnticTypes, Being, ModelType> | null;

  readonly findAll: (
    args: '*' |
      (IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>),
  ) => ReadonlyArray<IModel<OnticTypes, Being, ModelType>>;

  readonly findAllGenerator: (
    args: '*' |
      (IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>),
  ) => IterableIterator<IModel<OnticTypes, Being, ModelType>>;

  readonly getTag: (toSearch: Tag) => ITag | null;
  readonly removeTag: (tag: Tag) =>  void;
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
