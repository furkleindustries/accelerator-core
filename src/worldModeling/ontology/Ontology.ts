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
  IOntology,
} from './IOntology';
import {
  IOntologyConstructorArgs,
} from './IOntologyConstructorArgs';
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
import { ISerializedOntology } from './ISerializedOntology';

export class Ontology<
  Type extends OnticTypes,
  Being extends OnticTypes,
> implements IOntology<Type, Being>
{
  public readonly adjacency: IAdjacencyRelation<Type, Being>;

  readonly containment: Type extends ContainmentTypes ?
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

    this.adjacency = new AdjacencyRelation(this.world, { modelType });
    if (modelType === ModelType.Actor ||
        modelType === ModelType.Location ||
        modelType === ModelType.Object)
    {
      this.containment = new ContainmentRelation(
        this.world,
        modelType as ContainmentTypes,
      ) as any;
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
  public readonly clone: () => IOntology<Type, Being>;
  public readonly destroy = () => {
    if (typeof this.finalize === 'function') {
      this.finalize(this);
    }

    this.adjacency.destroy();
    if (this.containment && typeof this.containment.destroy === 'function') {
      this.containment.destroy();
    }

    this.tags.forEach(this.removeTag);

    ((self: any) => {
      delete self.__adjacency;
      delete self.adjacency;
      delete self.__containment;
      delete self.containment;
      delete self.__tags;
      delete self.tags;
    })(this);
  };

  public readonly getTag = (toSearch: Tag) => getTag(this.tags, toSearch);
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
