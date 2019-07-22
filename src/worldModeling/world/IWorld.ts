import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
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

  /* Worlds may "possess" generic and/or global thoughts but may not be
   * "aware." */
  readonly knowledge: IEpistemology<ModelType.Thought, never, ModelType>;

  readonly models: Readonly<
    Record<string, IModel<ModelType, BeingNoThoughtsBase, ModelType>>
  >;

  readonly name: string;
  readonly tags: ReadonlyArray<string | Tag>;
  readonly type: Symbol;

  readonly addModel: <
    Type extends ModelType,
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: IModelConstructorArgs<Type, Being, Knowledge>,
    ctor?: new (
      world: IWorld,
      args: IModelConstructorArgs<Type, Being, Knowledge>,
    ) => IModel<Type, Being, Knowledge>,
  ) => IModel<Type, Being, Knowledge>;

  readonly addTag: (tag: string | Tag) => void;

  readonly children: () => ReadonlyArray<
    IModel<ModelType, BeingNoThoughtsBase, ModelType>
  >;

  readonly clone: (name: string) => IWorld;
  readonly descendants: () => ReadonlyArray<
    IModel<ModelType, BeingNoThoughtsBase, ModelType>
  >;

  readonly destroy: () => void;

  readonly finalize: (self: IWorld) => void;

  readonly find: <
    Type extends ModelType,
    Being extends BeingNoThoughtsBase,
    Knowing extends ModelType,
  >(
    args: string | FindModelArgs<Type, Being, Knowing>,
  ) => IModel<Type, Being, Knowing> | null;

  readonly findAll: <
    Type extends ModelType,
    Being extends BeingNoThoughtsBase,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  ) => ReadonlyArray<IModel<Type, Being, Knowing>>;

  readonly findAllGenerator: <
    Type extends ModelType,
    Being extends BeingNoThoughtsBase,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  ) => IterableIterator<IModel<Type, Being, Knowing>>;

  readonly getTag: (toSearch: string | Tag) => any;

  readonly initialize: (self: IWorld) => void;

  readonly removeModel: <Type extends ModelType>(
    model: string | IModel<Type, BeingNoThoughtsBase, ModelType>,
  ) => void;

  readonly removeTag: (key: string | Tag) => void;
}
