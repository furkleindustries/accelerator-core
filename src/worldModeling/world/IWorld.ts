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
  INamed,
} from '../../interfaces/INamed';
import {
  ISerializedWorld,
} from './ISerializedWorld';
import {
  ITag,
} from '../../tags/ITag';
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

export interface IWorld extends INamed {
  readonly being: null;

  /* Worlds may "possess" generic and/or global thoughts but may not be
   * "aware." */
  readonly knowledge: IEpistemology<ModelType.Thought, ModelType>;

  readonly models: Readonly<
    Record<string, IModel<ModelType, OnticTypes, ModelType>>
  >;

  readonly tags: readonly ITag[];
  readonly type: symbol;

  readonly addModel: <
    Type extends ModelType,
    Being extends OnticTypes = any,
    Knowledge extends ModelType = any,
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
  readonly children: () => readonly IModel<ModelType, OnticTypes, ModelType>[];
  readonly clone: (name: string) => IWorld;
  readonly descendants: () => readonly IModel<ModelType, OnticTypes, ModelType>[];
  readonly destroy: () => void;
  readonly finalize: (self: IWorld) => void;

  readonly find: (
    args: FindModelArgs<ModelType, OnticTypes, ModelType>,
  ) => IModel<ModelType, OnticTypes, ModelType> | null;

  readonly findAll: (
    args: FindModelArgs<ModelType, OnticTypes, ModelType>,
  ) => readonly IModel<ModelType, OnticTypes, ModelType>[];

  readonly findAllGenerator: (
    args: FindModelArgs<ModelType, OnticTypes, ModelType>,
  ) => IterableIterator<IModel<ModelType, OnticTypes, ModelType>>;

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
