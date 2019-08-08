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
  readonly knowledge: null;
  readonly type: ModelType.Location;
}
