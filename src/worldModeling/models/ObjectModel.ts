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

// @ts-ignore
export class ObjectModel<
  Being extends OnticTypes,
> extends ModelBase<ModelType.Object, Being>
  implements IModel<ModelType.Object, Being>
{
  public readonly being: IOntology<ModelType.Object, Being>;
  public readonly knowledge: null = null;

  constructor(
    world: IWorld,
    args: IModelConstructorArgs<ModelType.Object, Being>,
  ) {
    super(world, args);

    this.being = new Ontology<ModelType.Object, Being>(world, { modelType: args.type });
  }
}