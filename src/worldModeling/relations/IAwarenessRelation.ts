import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IAwarenessRelation<
  Type extends OnticTypes,
  Knowledge extends ModelType,
> extends IRelation<Type>
{
  readonly perceives: ReadonlyArray<IModel<Type, OnticTypes, Knowledge>>;

  readonly addPerception: (
    model: IModel<Type, OnticTypes, Knowledge>,
  ) => void;

  readonly clone: () => IAwarenessRelation<Type, Knowledge>;

  readonly removePerception: (
    tag: IModel<Type, OnticTypes, Knowledge>,
  ) => void;
}
