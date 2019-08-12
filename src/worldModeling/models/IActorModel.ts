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

  readonly observe: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ) => void;

  readonly take: (
    self: IActorModel<Being, Knowledge>,
    target: IObjectModel<Being>,
  ) => void;

  readonly unobserve: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ) => void;

  readonly unwant: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<ModelType, Being, Knowledge>,
  ) => void;

  readonly want: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<ModelType, Being, Knowledge>,
  ) => void;
}
