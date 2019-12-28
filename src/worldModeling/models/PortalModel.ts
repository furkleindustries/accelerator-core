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
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export class PortalModel<
  Being extends OnticTypes,
> extends ModelBase<ModelType.Portal, Being>
  implements IModel<ModelType.Portal, Being>
{
  readonly being: IOntology<ModelType.Portal, Being>;
  readonly knowledge: null = null;
}
