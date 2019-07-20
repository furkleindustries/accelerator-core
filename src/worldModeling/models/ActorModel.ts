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
  ModelBase,
} from './ModelBase';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from './ModelType';

export class ActorModel<
  Type extends ModelType.Actor,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends ModelBase<Type, Being, Knowledge>
{
  private __being: IOntology<
    Type,
    Being,
    Knowledge
  > = new Ontology();

  public get being() {
    return this.__being;
  }

  private __knowledge: IEpistemology<Type, Being, Knowledge> = new Epistemology();

  public get knowledge() {
    return this.__knowledge;
  }

  readonly type: Type;
  readonly move: (
    destination: IModel<ModelType, ModelType, ModelType> | IWorld,
  ) => void;
}