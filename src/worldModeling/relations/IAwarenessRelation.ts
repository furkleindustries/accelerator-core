import {
  AwareTypes,
} from './AwareTypes';
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

  readonly clone: (
    self: IAwarenessRelation<Type, Knowledge>,
  ) => IAwarenessRelation<Type, Knowledge>;

  readonly destroy: (
    self: IAwarenessRelation<Type, Knowledge>,
  ) => void;

  readonly find: (
    args: string |
      IFindBaseArgs<OnticTypes> & FindAwarenessArgs<AwareTypes, OnticTypes>,
  ) => IModel<OnticTypes, OnticTypes, Knowledge> | null;

  readonly findAll: (
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindAwarenessArgs<AwareTypes, OnticTypes>,
  ) => ReadonlyArray<IModel<OnticTypes, OnticTypes, Knowledge>>;

  readonly findAllGenerator: (
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindAwarenessArgs<AwareTypes, OnticTypes>,
  ) => IterableIterator<IModel<OnticTypes, OnticTypes, Knowledge>>;

  readonly removePerception: (
    tag: IModel<OnticTypes, OnticTypes, Knowledge>,
  ) => void;

  readonly serializeToObject: (
    self: IAwarenessRelation<Type, Knowledge>,
  ) => ISerializedAwarenessRelation;
}
