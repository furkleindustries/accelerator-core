import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  FindAwarenessArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ISerializedAwarenessRelation,
} from './ISerializedAwarenessRelation';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IAwarenessRelation<
  Type extends EpistemicTypes & OnticTypes,
  Knowledge extends ModelType,
> extends IRelation<Type>
{
  readonly perceptions: ReadonlyArray<IModel<OnticTypes, OnticTypes, Knowledge>>;

  readonly addPerception: (
    model: IModel<OnticTypes, OnticTypes, Knowledge>,
  ) => void;

  readonly clone: () => IAwarenessRelation<Type, Knowledge>;

  readonly find: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: string |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<EpistemicTypes & OnticTypes, Being>,
  ) => IModel<OnticTypes, Being, Knowledge> | null;

  readonly findAll: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<EpistemicTypes & OnticTypes, Being>,
  ) => ReadonlyArray<IModel<OnticTypes, Being, Knowledge>>;

  readonly findAllGenerator: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<EpistemicTypes & OnticTypes, Being>,
  ) => IterableIterator<IModel<OnticTypes, Being, Knowledge>>;

  readonly removePerception: (
    tag: IModel<OnticTypes, OnticTypes, Knowledge>,
  ) => void;

  readonly serializeToObject: (
    self: IAwarenessRelation<Type, Knowledge>,
  ) => ISerializedAwarenessRelation;
}
