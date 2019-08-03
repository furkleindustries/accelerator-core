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

export interface IObjectModel<
  Being extends OnticTypes,
> extends IModel<ModelType.Object, Being>
{
  readonly being: IOntology<ModelType.Object, Being>;
  readonly knowledge: null;
  readonly type: ModelType.Object;
}
