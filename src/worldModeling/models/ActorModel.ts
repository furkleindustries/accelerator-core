import {
  Epistemology,
} from '../epistemology/Epistemology';
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
  Ontology,
} from '../ontology/Ontology';

export class ActorModel<
  Being extends ModelType,
  Knowledge extends ModelType,
> extends ModelBase<ModelType.Actor, Being, Knowledge>
{
  protected readonly __being: IOntology<
    ModelType.Actor,
    Being,
    Knowledge
  > | null = new Ontology();

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
    destination: IModel<ModelType, ModelType, ModelType> | IWorld,
  ) => void;
}