import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  FindModelArgs,
} from '../models/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  ITag,
} from '../../tags/ITag';

export interface IRelation<Type extends ModelType> {
  readonly modelType: Type;
  readonly tags: ReadonlyArray<ITag>;
  readonly world: IWorld;

  readonly addTag: (tag: ITag) => void;
  readonly clone: () => IRelation<Type>;
  readonly destroy: () => void;
  readonly find: <
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowledge>
  ) => IModel<Type, Being, Knowledge> | null;

  readonly findAll: <
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: Exclude<FindModelArgs<Type, Being, Knowledge>, string>
  ) => ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly findAllGenerator: <
    Being extends BeingNoThoughtsBase,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  ) => IterableIterator<IModel<Type, Being, Knowing>>;

  readonly removeTag: (tag: ITag) => void;
}
