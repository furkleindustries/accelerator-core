import {
  addTag,
} from '../../tags/addTag';
import {
  BeingNoThoughtsBase
} from '../epistemology/BeingNoThoughtsBase';
import {
  FindModelArgs,
} from '../models/FindModelArgs';
import {
  getTag,
} from '../../tags/getTag';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
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
  removeTag,
} from '../../tags/removeTag';
import {
  Tag,
} from '../../tags/Tag';

export abstract class RelationBase<Type extends ModelType> implements IRelation<Type> {
  private readonly __modelType: Type;
  public get modelType() {
    return this.__modelType;
  }

  private __tags: ReadonlyArray<ITag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  }

  private __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(world: IWorld, type: Type) {
    this.__world = world;
    this.__modelType = type;
  }

  public readonly addTag = (tag: Tag) => (
    void (this.__tags = addTag(this.tags, tag))
  );

  public readonly getTag = (tag: Tag) => getTag(this.tags, tag);

  public readonly removeTag = (tag: Tag) => (
    void (this.__tags = removeTag(this.tags, tag))
  );

  abstract readonly clone: () => this;
  abstract readonly destroy: () => void;
  abstract readonly find: <
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowledge>,
  ) => IModel<Type, Being, Knowledge> | null;

  abstract readonly findAll: <
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: Exclude<FindModelArgs<Type, Being, Knowledge>, string>
  ) => ReadonlyArray<IModel<Type, Being, Knowledge>>;

  abstract readonly findAllGenerator: <
    Being extends BeingNoThoughtsBase,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  ) => IterableIterator<IModel<Type, Being, Knowing>>;
}
