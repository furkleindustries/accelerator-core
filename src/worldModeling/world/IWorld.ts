import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  FindModelArgs,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IModelConstructorArgs,
} from '../models/IModelConstructorArgs';
import {
  ISerializedWorld,
} from './ISerializedWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  Tag,
} from '../../tags/Tag';
import {
  TypedModelInterfaces,
} from '../models/TypedModelInterfaces';

export interface IWorld {
  readonly being: null;

  /* Worlds may "possess" generic and/or global thoughts but may not be
   * "aware." */
  readonly knowledge: IEpistemology<ModelType.Thought, ModelType>;

  readonly models: Readonly<
    Record<string, IModel<ModelType, OnticTypes, ModelType>>
  >;

  readonly name: string;
  readonly tags: ReadonlyArray<Tag>;
  readonly type: Symbol;

  readonly addModel: <
    Type extends ModelType,
    Being extends OnticTypes = never,
    Knowledge extends ModelType = never,
  >(
    args: IModelConstructorArgs<Type, Being, Knowledge>,
    ctor?: new (
      world: IWorld,
      args: IModelConstructorArgs<Type, Being, Knowledge>,
    ) => IModel<Type, Being, Knowledge>,
  ) => (
    Type extends keyof TypedModelInterfaces<Being, Knowledge> ?
      TypedModelInterfaces<Being, Knowledge>[Type] :
      IModel<Type, Being, Knowledge>
  );

  readonly addTag: (tag: Tag) => void;

  readonly children: () => ReadonlyArray<
    IModel<ModelType, OnticTypes, ModelType>
  >;

  readonly clone: (name: string) => IWorld;
  readonly descendants: () => ReadonlyArray<
    IModel<ModelType, OnticTypes, ModelType>
  >;

  readonly destroy: () => void;

  readonly finalize: (self: IWorld) => void;

  readonly find: <
    Type extends ModelType,
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowledge>,
  ) => IModel<Type, Being, Knowledge> | null;

  readonly findAll: <
    Type extends ModelType,
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowledge>,
  ) => ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly findAllGenerator: <
    Type extends ModelType,
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowledge>,
  ) => IterableIterator<IModel<Type, Being, Knowledge>>;

  readonly getTag: (toSearch: Tag) => any;

  readonly initialize: (self: IWorld) => void;

  readonly serialize: (
    self: IWorld,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (self: IWorld) => ISerializedWorld;

  readonly removeModel: <Type extends ModelType>(
    model: IModel<Type, OnticTypes, ModelType>,
  ) => void;

  readonly removeTag: (key: Tag) => void;
}
