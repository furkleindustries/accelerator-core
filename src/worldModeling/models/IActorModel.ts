import {
  IModel,
} from './IModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';

export interface IActorModel<
  Type extends ModelType.Actor,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IModel<Type, Being, Knowledge>
{
  readonly being: IOntology<Type, Being, Knowledge>;
  readonly knowledge: null;
  readonly type: Type;
  readonly move: (
    destination: IModel<ModelType, ModelType, ModelType> | IWorld,
  ) => void;
}
