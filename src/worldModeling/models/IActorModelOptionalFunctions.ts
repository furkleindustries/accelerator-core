import {
  ActorModelOptionalFunctionNames,
} from './ActorModelOptionalFunctionNames';
import {
  IActorModel,
} from './IActorModel';
import {
  IModel,
} from './IModel';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  TypedModelInterfaces,
} from './TypedModelInterfaces';

export interface IActorModelOptionalFunctions<
  Being extends OnticTypes,
  Knowledge extends ModelType,
> {
  readonly [ActorModelOptionalFunctionNames.act]?: <
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

  readonly [ActorModelOptionalFunctionNames.canAct]?: (
    self: IActorModel<Being, Knowledge>,
  ) => boolean;

  readonly [ActorModelOptionalFunctionNames.canActOn]?: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ) => boolean;

  readonly [ActorModelOptionalFunctionNames.getActionTargets]?: (self: IActorModel<Being, Knowledge>) => ReadonlyArray<
    IModel<OnticTypes, Being, Knowledge>
  >;

  readonly [ActorModelOptionalFunctionNames.selectActionTarget]?: (
    self: IActorModel<Being, Knowledge>,
    targets: IModel<OnticTypes, Being, Knowledge> |
      ReadonlyArray<IModel<OnticTypes, Being, Knowledge>>,
  ) => IModel<OnticTypes, Being, Knowledge>;

  readonly [ActorModelOptionalFunctionNames.willAct]?: (
    self: IActorModel<Being, Knowledge>,
  ) => boolean;
}
