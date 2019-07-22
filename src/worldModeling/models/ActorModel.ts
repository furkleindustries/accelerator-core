import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  Epistemology,
} from '../epistemology/Epistemology';
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

export class ActorModel<
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> extends ModelBase<ModelType.Actor, Being, Knowledge>
{
  protected readonly __being: IOntology<
    ModelType.Actor,
    Being,
    Knowledge
  > = new Ontology();

  public get being() {
    return this.__being;
  }

  protected readonly __knowledge: IEpistemology<
    ModelType.Actor,
    Being,
    Knowledge
  > = new Epistemology();

  public get knowledge() {
    return this.__knowledge;
  }

  public readonly type = ModelType.Actor;

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