import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ModelType,
} from '../models/ModelType';

export interface IAwarenessRelation<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IRelation<Type>
{
  readonly perceives: ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly addPerception: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;

  readonly removePerception: (
    tag: string | IModel<Type, Being, Knowledge>,
  ) => void;
}
