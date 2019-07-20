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
  Tag,
} from '../../tags/Tag';

export interface IRelation<Type extends ModelType> {
  readonly name: string;
  readonly tags: ReadonlyArray<Tag>;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly destroy: () => void;
  readonly find: <Being extends ModelType, Knowledge extends ModelType>(
    args: FindModelArgs<Type, Being, Knowledge>
  ) => IModel<Type, Being, Knowledge> | null;
  readonly findAll: <Being extends ModelType, Knowledge extends ModelType>(
    args: Exclude<FindModelArgs<Type, Being, Knowledge>, string>
  ) => IModel<Type, Being, Knowledge>[];

  readonly findAllGenerator: <
    Being extends ModelType,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  ) => IterableIterator<IModel<Type, Being, Knowing>>;

  readonly removeTag: (tag: Tag) => void;
}
