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

export interface IActorModelOptionalFunctions<
  Being extends OnticTypes,
  Knowledge extends ModelType,
> {
  readonly [ActorModelOptionalFunctionNames.Act]?: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ) => void;

  readonly [ActorModelOptionalFunctionNames.CanAct]?: (
    self: IActorModel<Being, Knowledge>,
  ) => boolean;

  readonly [ActorModelOptionalFunctionNames.CanActOn]?: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ) => boolean;

  readonly [ActorModelOptionalFunctionNames.GetActionTargets]?: (
    self: IActorModel<Being, Knowledge>,
  ) => readonly IModel<OnticTypes, Being, Knowledge>[];

  readonly [ActorModelOptionalFunctionNames.SelectActionTarget]?: (
    self: IActorModel<Being, Knowledge>,
    targets: IModel<OnticTypes, Being, Knowledge> |
      readonly IModel<OnticTypes, Being, Knowledge>[],
  ) => IModel<OnticTypes, Being, Knowledge>;

  readonly [ActorModelOptionalFunctionNames.WillAct]?: (
    self: IActorModel<Being, Knowledge>,
  ) => boolean;
}
