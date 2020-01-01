import {
  FindOnticArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  ILocationModel,
} from './ILocationModel';
import {
  IModel,
} from './IModel';
import {
  IModelConstructorArgs,
} from './IModelConstructorArgs';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelBase,
} from './ModelBase';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  Ontology,
} from '../ontology/Ontology';

export class LocationModel<
  Being extends OnticTypes,
> extends ModelBase<ModelType.Location, Being>
  implements ILocationModel<Being>
{
  protected readonly __being: IOntology<ModelType.Location, Being>;

  public get being() {
    return this.__being;
  }

  public get knowledge() {
    return null;
  }

  public get type(): ModelType.Location {
    return ModelType.Location;
  }

  constructor(
    world: IWorld,
    args: IModelConstructorArgs<ModelType.Location, Being>,
  ) {
    super(world, args);

    this.__being = new Ontology<
      ModelType.Location,
      Being
    >(world, { modelType: args.type });
  }

  readonly find: (
    args: string |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>,
  ) => IModel<OnticTypes, Being, ModelType> | null;

  readonly findAll: (
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>,
  ) => readonly IModel<OnticTypes, Being, ModelType>[];

  readonly findAllGenerator: (
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>,
  ) => IterableIterator<IModel<OnticTypes, Being, ModelType>>;
}
