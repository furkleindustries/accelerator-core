import {
  addTag,
} from '../../tags/addTag';
import {
  FindModelArgs, IFindBaseArgs,
} from '../querying/FindModelArgs';
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
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  removeTag,
} from '../../tags/removeTag';
import {
  Tag,
} from '../../tags/Tag';

export abstract class RelationBase<
  Type extends ModelType,
> implements IRelation<Type>
{
  protected readonly __modelType: ModelType;
  public get modelType() {
    return this.__modelType;
  }

  protected __tags: ReadonlyArray<ITag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  }

  protected readonly __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(world: IWorld, type: Type, tags?: Tag[] | ReadonlyArray<Tag>) {
    this.__world = world;
    this.__modelType = type;

    if (Array.isArray(tags)) {
      tags.forEach(this.addTag);
    }
  }

  public readonly addTag = (tag: Tag) => (
    void (this.__tags = addTag(this.tags, tag))
  );

  public readonly getTag = (tag: Tag) => getTag(this.tags, tag);

  public readonly removeTag = (tag: Tag) => (
    void (this.__tags = removeTag(this.tags, tag))
  );

  public readonly find = (
    args: string | IFindBaseArgs<ModelType>,
  ): IModel<ModelType, OnticTypes, ModelType> | null => this.findAllGenerator(
    typeof args === 'string' ?
      { name: args } :
      args,
  ).next().value || null;
  
  public readonly findAll = (
    args: '*' | IFindBaseArgs<ModelType>,
  ): ReadonlyArray<IModel<ModelType, OnticTypes, ModelType>> =>
  {
    const ret = [];
    for (const model of this.findAllGenerator(args)) {
      ret.push(model);
    }

    return ret;
  };

  public readonly serialize = (
    self: IRelation<Type>,
    spaces?: number,
  ): string => JSON.stringify(this.serializeToObject(self), null, spaces);

  public abstract readonly findAllGenerator: (
    args: '*' | FindModelArgs<ModelType, OnticTypes, ModelType>,
  ) => IterableIterator<IModel<ModelType, OnticTypes, ModelType>>;

  public abstract readonly clone: () => any;
  public abstract readonly destroy: () => void;
  public abstract readonly serializeToObject: (
    self: IRelation<Type>,
  ) => Readonly<Record<string, any>>;
}
