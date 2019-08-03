import {
  BaseAdjacencies,
} from '../ontology/BaseAdjacencies';
import {
  IAdjacencyRelation,
} from './IAdjacencyRelation';
import {
  IAdjacencyRelationConstructorArgs,
} from './IAdjacencyRelationConstructorArgs';
import {
  IModel,
} from '../models/IModel';
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
  RelationBase,
} from './RelationBase';

type Adjacencies<T extends BaseAdjacencies = BaseAdjacencies> = T;

export class AdjacencyRelation<
  Type extends OnticTypes,
  Being extends OnticTypes,
> extends RelationBase<Type>
  implements IAdjacencyRelation<Type, Being>
{
  protected readonly __modelType: Type;
  public get modelType() {
    return this.__modelType;
  }

  protected readonly __neighbors: Readonly<
    Map<Adjacencies, ReadonlyArray<IModel<Type, Being, ModelType>>>
  > = Object.freeze(new Map());

  public get neighbors() {
    return this.__neighbors;
  }

  protected __tags: ReadonlyArray<ITag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  }

  protected readonly __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(
    world: IWorld,
    args: IAdjacencyRelationConstructorArgs<Type>,
  ) {
    super(world, args.modelType);
  }

  public readonly clone = () => {
    const copy: IAdjacencyRelation<Type, Being> = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    this.neighbors.forEach((value, key) => value.forEach((model) => (
      copy.addNeighbor(key, model)
    )));
  };

  public readonly destroy = ((self: any) => () => {
    delete self.__modelType;
    delete self.modelType;
    this.tags.forEach(this.removeTag);
    delete self.__tags;
    delete self.tags;
    delete self.__world;
    delete self.world;
  })(this);

  public readonly addNeighbor = <T extends BaseAdjacencies = BaseAdjacencies>(
    adjacency: T,
    model: IModel<Type, Being, ModelType>,
  ): void => {
    if (this.neighbors.has(adjacency)) {
      const arr = this.neighbors.get(adjacency);
      if (!arr!.find((val) => val.name === model.name)) {
        this.neighbors.set(adjacency, Object.freeze(arr!.concat([ model ])));
      }
    } else {
      const models = Object.freeze([ model ]);
      this.neighbors.set(adjacency, models);
    }
  };

  public readonly findAllGenerator = ((self: any) => function* () {

  })(this);

  public readonly removeNeighbor = <T extends BaseAdjacencies = BaseAdjacencies>(
    adjacency: T,
    model: IModel<Type, Being, ModelType>,
  ): void => {
    if (this.neighbors.has(adjacency)) {
      const arr = this.neighbors.get(adjacency);
      if (!arr!.find((val) => val.name === model.name)) {
        this.neighbors.set(adjacency, Object.freeze(arr!.concat([ model ])));
      }
    }
    
    throw new Error('Adjacency not in AdjacencyRelation.');
  };
}
