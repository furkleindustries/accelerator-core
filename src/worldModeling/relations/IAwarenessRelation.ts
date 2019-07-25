import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
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
  Type extends EpistemicTypes,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> extends IRelation<Type>
{
  readonly perceives: ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly addPerception: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;

  readonly clone: () => IAwarenessRelation<Type, Being, Knowledge>;

  readonly removePerception: (
    tag: string | IModel<Type, Being, Knowledge>,
  ) => void;
}
