import {
  IActorModelOptionalFunctions,
} from './IActorModelOptionalFunctions';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  ILocationModel,
} from './ILocationModel';
import {
  IModel,
} from './IModel';
import {
  IObjectModel,
} from './IObjectModel';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  TypedModelInterfaces,
} from './TypedModelInterfaces';

export interface IActorModel<
  Being extends OnticTypes,
  Knowledge extends ModelType,
> extends IModel<ModelType.Actor, Being, Knowledge>,
  Partial<IActorModelOptionalFunctions<Being, Knowledge>>
{
  readonly being: IOntology<ModelType.Actor, Being>;
  readonly knowledge: IEpistemology<ModelType.Actor, Knowledge>;
  readonly type: ModelType.Actor;

  readonly drop: (
    self: IActorModel<Being, Knowledge>,
    target: IObjectModel<Being>,
  ) => void;

  readonly move: (
    self: IActorModel<Being, Knowledge>,
    destination: ILocationModel<Being>,
  ) => void;

  readonly observe: <
    Type extends OnticTypes,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ) => void;

  readonly take: (
    self: IActorModel<Being, Knowledge>,
    target: IObjectModel<Being>,
  ) => void;

  readonly unobserve: <
    Type extends OnticTypes,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ) => void;

  readonly unwant: <
    Type extends ModelType,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ) => void;

  readonly want: <
    Type extends ModelType,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ) => void;
}
