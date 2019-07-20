import {
  IModel,
} from './IModel';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';

export interface ILocationModel<
  Type extends ModelType.Location,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IModel<Type, Being, ModelType>
{
  readonly being: IOntology<Type, Being, Knowledge>;
  readonly knowledge: null;
  readonly type: Type;
}
