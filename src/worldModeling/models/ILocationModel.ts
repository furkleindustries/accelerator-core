import {
  FindOnticArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
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

export interface ILocationModel<
  Being extends OnticTypes,
> extends IModel<ModelType.Location, Being>
{
  readonly being: IOntology<ModelType.Location, Being>;
  readonly find: (
    args: string |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>,
  ) => IModel<OnticTypes, Being, ModelType> | null;

  readonly findAll: (
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>,
  ) => ReadonlyArray<IModel<OnticTypes, Being, ModelType>>;

  readonly findAllGenerator: (
    args: '*' |
      IFindBaseArgs<OnticTypes> & FindOnticArgs<OnticTypes, Being, ModelType>,
  ) => IterableIterator<IModel<OnticTypes, Being, ModelType>>;

  readonly knowledge: null;
  readonly type: ModelType.Location;
}
