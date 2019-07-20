import {
  IAwarenessRelation,
} from '../relations/IAwarenessRelation';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  FindModelArgs,
} from '../models/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IModelConstructorArgs,
} from '../models/IModelConstructorArgs';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IWorld {
  readonly being: null;
  readonly knowledge: Exclude<
    IEpistemology<ModelType.Thought, ModelType, ModelType>,
    IAwarenessRelation<any, any, any>
  >;

  readonly models: Readonly<
    Record<string, IModel<ModelType, ModelType, ModelType>>
  >;

  readonly name: string;
  readonly tags: ReadonlyArray<string | Tag>;

  readonly addModel: <
    Type extends ModelType,
    Being extends ModelType,
    Knowledge extends ModelType,
  >(
    args: IModelConstructorArgs<Type, Being, Knowledge>,
    ctor?: new (
      world: IWorld,
      args: IModelConstructorArgs<Type, Being, Knowledge>,
    ) => IModel<Type, Being, Knowledge>,
  ) => IModel<Type, Being, Knowledge>;

  readonly removeModel: <T extends ModelType>(
    model: string | IModel<T, ModelType, ModelType>,
  ) => void;

  readonly children: () => ReadonlyArray<
    IModel<ModelType, ModelType, ModelType>
  >;

  readonly clone: (name: string) => IWorld;
  readonly descendants: () => ReadonlyArray<
    IModel<ModelType, ModelType, ModelType>
  >;

  readonly destroy: () => void;

  readonly finalize: (self: IWorld) => void;

  readonly find: <
    Type extends ModelType,
    Being extends ModelType,
    Knowing extends ModelType,
  >(
    args: string | FindModelArgs<Type, Being, Knowing>,
  ) => IModel<Type, Being, Knowing> | null;

  readonly findAll: <
    Type extends ModelType,
    Being extends ModelType,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  ) => ReadonlyArray<IModel<Type, Being, Knowing>>;

  readonly findAllGenerator: <
    Type extends ModelType,
    Being extends ModelType,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  ) => IterableIterator<IModel<Type, Being, Knowing>>;
}
