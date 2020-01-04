import {
  addTag,
} from '../../tags/addTag';
import {
  AdjacencyRelation,
} from '../relations/AdjacencyRelation';
import {
  ContainmentRelation,
} from '../relations/ContainmentRelation';
import {
  ContainmentTypes,
} from '../relations/ContainmentTypes';
import {
  ContainingTypes,
} from '../relations/ContainingTypes';
import {
  findAllGenerate,
} from '../querying/findAllGenerate';
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
  isContainmentType,
} from '../typeGuards/isContainmentType';
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

  readonly containment: Type extends ContainmentTypes ?
    IContainmentRelation<ContainingTypes, NoLocation<Being>> :
    null;

  private readonly __modelType: Type;
  public get modelType() {
    return this.__modelType;
  }

  private __tags: readonly ITag[] = Object.freeze([]);
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

    if (isContainmentType(modelType)) {
      // @ts-ignore
      this.containment = (
        new ContainmentRelation<Type, NoLocation<Being>>(
          this.world,
          { modelType },
        )
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
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(self)),
      self,
    );

    copy.adjacency = Object.freeze(self.adjacency.clone(self.adjacency))
    copy.containment = self.containment ?
      Object.freeze(self.containment.clone(self.containment)) :
      null;

    return copy;
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

  public readonly find = (
    args: string |
      (IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>),
  ): IModel<OnticTypes, Being, ModelType> | null => this.findAllGenerator(
    typeof args === 'string' ?
      {
        name: args,
      } as IFindBaseArgs<OnticTypes> &
        FindOnticArgs<OnticTypes, Being, ModelType> :

      args,
  ).next().value || null;

  public readonly findAll = (
    args: '*' |
      (IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>),
  ): readonly IModel<OnticTypes, Being, ModelType>[] => {
    const ret = [];
    for (const model of this.findAllGenerator(args)) {
      ret.push(model);
    }

    return ret;
  };

  readonly findAllGenerator = ((self: IOntology<Type, Being>) => function* (
    args: '*' |
      (IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>),
  ): IterableIterator<IModel<OnticTypes, Being, ModelType>>
  {
    const models: IModel<OnticTypes, Being, ModelType>[] = [];
    for (const _models of self.adjacency.neighbors.values()) {
      models.push(..._models);
    }

    models.push(
      ...(self.containment ? self.containment.children : []),
    );

    yield* findAllGenerate<OnticTypes, Being, ModelType>(models, args);
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
