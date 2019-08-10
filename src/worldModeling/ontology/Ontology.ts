import {
  addTag,
} from '../../tags/addTag';
import {
  AdjacencyRelation,
} from '../relations/AdjacencyRelation';
import {
  ContainableTypes,
} from '../relations/ContainableTypes';
import {
  ContainmentRelation,
} from '../relations/ContainmentRelation';
import {
  ContainmentTypes,
} from '../relations/ContainmentTypes';
import {
  FindOnticArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  getStructuredTags,
} from '../../tags/getStructuredTags';
import {
  getTag,
} from '../../tags/getTag';
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
  IOntology,
} from './IOntology';
import {
  IOntologyConstructorArgs,
} from './IOntologyConstructorArgs';
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
  OntologyType,
} from './OntologyType';
import {
  removeTag,
} from '../../tags/removeTag';
import {
  Tag,
} from '../../tags/Tag';
import {
  assertValid,
} from 'ts-assertions';

export class Ontology<
  Type extends OnticTypes,
  Being extends OnticTypes,
> implements IOntology<Type, Being>
{
  public readonly adjacency: IAdjacencyRelation<Type, Being>;

  readonly containment: Type extends (ContainableTypes | ContainmentTypes) ?
    IContainmentRelation<
      /* Do not allow portals to have containment relations. */
      ContainmentTypes,

      Being extends ModelType.Object ?
        /* Do not allow objects to contain locations or portals. */
        Exclude<Being, ModelType.Location | ModelType.Portal> :
        /* Do not allow portals or thoughts to be contained as models. */
        Being
    > :
    null = null as any;

  private readonly __modelType: Type;
  public get modelType() {
    return this.__modelType;
  }

  private __tags: ReadonlyArray<ITag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  }

  public get type() {
    return OntologyType;
  }

  private readonly __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(
    world: IWorld,
    {
      finalize,
      initialize,
      modelType,
      tags,
    }: IOntologyConstructorArgs<Type, Being>,
  ) {
    this.__world = assertValid(world);

    this.__modelType = assertValid(modelType);

    if (Array.isArray(tags)) {
      this.__tags = Object.freeze(getStructuredTags(tags));
    }

    this.adjacency = new AdjacencyRelation<Type, Being>(
      this.world,
      { modelType },
    );

    if (modelType === ModelType.Actor ||
        modelType === ModelType.Location ||
        modelType === ModelType.Object)
    {
      this.containment = new ContainmentRelation<Type, Being>(
        this.world,
        modelType,
      );
    }

    if (typeof finalize === 'function') {
      this.finalize = finalize;
    }

    if (typeof initialize === 'function') {
      this.initialize = initialize;
      this.initialize(this);
    }
  }

  public readonly addTag = (tag: Tag) => addTag(this.tags, tag);
  public readonly clone = (
    self: IOntology<Type, Being>,
  ): IOntology<Type, Being> => {

  };

  public readonly destroy = (self: IOntology<Type, Being>): void => {
    if (typeof self.finalize === 'function') {
      self.finalize(self);
    }

    self.adjacency.destroy(self.adjacency);
    if (self.containment && typeof self.containment.destroy === 'function') {
      self.containment.destroy(self.containment);
    }

    self.tags.forEach(this.removeTag);

    ((self: any) => {
      delete self.__adjacency;
      delete self.adjacency;
      delete self.__containment;
      delete self.containment;
      delete self.__tags;
      delete self.tags;
    })(self);
  };

  public readonly getTag = (toSearch: Tag) => getTag(this.tags, toSearch);

  public readonly find = <B extends Being, K extends ModelType>(
    args: string | IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, B, K>,
  ): IModel<OnticTypes, B, ModelType> | null => this.findAllGenerator(
    typeof args === 'string' ?
      { name: args } :
      args,
  ).next().value || null;

  public readonly findAll = <B extends Being, K extends ModelType>(
    args: '*' | IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, B, K>,
  ): ReadonlyArray<IModel<OnticTypes, B, ModelType>> => {
    const ret = [];
    for (const model of this.findAllGenerator(args)) {
      ret.push(model);
    }

    return ret;
  };

  readonly findAllGenerator = ((self: IOntology<Type, Being>) => function* <
    B extends Being,
    K extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, B, K>,
  ): IterableIterator<IModel<OnticTypes, B, K>>
  {
    
  })(this);

  public readonly removeTag = (toSearch: Tag) => removeTag(this.tags, toSearch);
  public readonly serializeToObject = (
    self: IOntology<Type, Being>,
  ): ISerializedOntology => ({
    adjacency: self.adjacency.serializeToObject(self.adjacency),
    containment: self.containment ?
      self.containment.serializeToObject(self.containment!) :
      null,

    modelType: self.modelType,
    tags: [ ...this.tags ],
  });

  public readonly serialize = (
    self: IOntology<Type, Being>,
    spaces: number = 0,
  ) => JSON.stringify(self.serializeToObject(self), null, spaces);

  public readonly finalize?: (self: IOntology<Type, Being>) => void;
  public readonly initialize?: (self: IOntology<Type, Being>) => void;
}
