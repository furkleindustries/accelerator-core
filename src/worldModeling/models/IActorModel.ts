import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  FindModelArg,
} from './FindModelArgs';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
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
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IActorModel<
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> extends IModel<ModelType.Actor, Being, Knowledge>
{
  readonly being: IOntology<ModelType.Actor, Being, Knowledge>;
  readonly knowledge: IEpistemology<ModelType.Actor, Being, Knowledge>;
  readonly type: ModelType.Actor;

  readonly move: (
    destination: IModel<ModelType.Location, BeingNoThoughtsBase, never> |
      IWorld,
  ) => void;

  readonly act?: (
    target: FindModelArg<
      OnticTypes,
      BeingNoThoughtsBase,
      ModelType
    >,

    self: this,
  ) => void;
}
