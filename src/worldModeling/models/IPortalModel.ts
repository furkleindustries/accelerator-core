import {
  ContainableTypes,
} from '../relations/ContainableTypes';
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

export interface IPortalModel<
  Being extends OnticTypes,
> extends IModel<ModelType.Portal, Being>
{
  readonly being: IOntology<ModelType.Portal, Being>;
  readonly knowledge: null;
  readonly type: ModelType.Portal;
  readonly transport: (
    model: string | IModel<ContainableTypes, OnticTypes, ModelType>,
  ) => void;
}
