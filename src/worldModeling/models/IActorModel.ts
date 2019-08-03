import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  IModel,
} from './IModel';
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
> extends IModel<ModelType.Actor, Being, Knowledge>
{
  readonly being: IOntology<ModelType.Actor, Being>;
  readonly knowledge: IEpistemology<ModelType.Actor, Knowledge>;
  readonly type: ModelType.Actor;

  readonly drop: (
    target: IModel<ModelType.Object, Being, Knowledge>,
    self: this,
  ) => void;

  readonly move: (
    destination: IModel<ModelType.Location, Being, Knowledge>,
    self: this,
  ) => void;

  readonly observe: (
    target: IModel<OnticTypes, Being, Knowledge>,
    self: this,
  ) => void;

  readonly take: (
    target: IModel<ModelType.Object, Being, Knowledge>,
    self: this,
  ) => void;

  readonly unobserve: (
    target: IModel<OnticTypes, Being, Knowledge>,
    self: this,
  ) => void;

  readonly unwant: (
    target: IModel<ModelType, Being, Knowledge>,
    self: this,
  ) => void;

  readonly want: (
    target: IModel<ModelType, Being, Knowledge>,
    self: this,
  ) => void;

  readonly act?: (
    target: IModel<OnticTypes, Being, Knowledge>,
    self: this,
  ) => void;
}
