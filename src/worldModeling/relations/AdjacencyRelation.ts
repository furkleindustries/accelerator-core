import {
  BaseAdjacencies,
} from '../ontology/BaseAdjacencies';
import {
  IAdjacencyRelation,
} from './IAdjacencyRelation';
import {
  IModel,
} from '../models/IModel';
import {
  ISerializedAdjacencyRelation,
} from './ISerializedAdjacencyRelation';
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
import { IFindBaseArgs, FindAdjacencyArgs } from '../querying/FindModelArgs';

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

  public readonly clone = (
    self: IAdjacencyRelation<Type, Being>,
  ): IAdjacencyRelation<Type, Being> => {
    const copy: IAdjacencyRelation<Type, Being> = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    this.neighbors.forEach((value, key) => value.forEach((model) => (
      copy.addNeighbor(key, model)
    )));

    return copy;
  };

  public readonly destroy = (self: IAdjacencyRelation<Type, Being>) => {
    if (typeof self.finalize === 'function') {
      self.finalize(self);
    }

    for (const key of self.neighbors.keys()) {
      self.neighbors.get(key)!.forEach((neighbor) => (
        self.removeNeighbor(key, neighbor))
      );
    }

    self.tags.forEach(self.removeTag);

    ((self: any) => {
      delete self.__modelType;
      delete self.modelType;
      delete self.__tags;
      delete self.tags;
      delete self.__world;
      delete self.world;
    })(self)
  };

  readonly find: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: string |
      IFindBaseArgs<Type> & FindAdjacencyArgs<Type, Being, Knowledge>,
  ) => IModel<Type, Being, Knowledge> | null;

  readonly findAll: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<Type> & FindAdjacencyArgs<Type, Being, Knowledge>,
  ) => ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly findAllGenerator: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<Type> & FindAdjacencyArgs<Type, Being, Knowledge>,
  ) => IterableIterator<IModel<Type, Being, Knowledge>>;

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

  public readonly serializeToObject = (
    self: IAdjacencyRelation<Type, Being>,
  ): ISerializedAdjacencyRelation => {
    const neighbors: Record<string, string[]> = {};
    for (const key of self.neighbors.keys()) {
      const value = self.neighbors.get(key);
      if (!value) {
        continue;
      }

      const names = value.map(({ name }) => name);

      if (typeof key === 'string') {
        /* Plain direction enum value. */
        neighbors[key] = names;
      } else if (typeof key === 'object') {
        /* Complex directional mapping. */
        key
      }
    }

    return {
      neighbors,
      modelType: self.modelType,
      tags: [ ...self.tags ],
    };
  };
}
