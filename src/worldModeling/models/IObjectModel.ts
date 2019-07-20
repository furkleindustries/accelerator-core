import {
  IModel,
} from './IModel';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';

export interface IObjectModel<
  Type extends ModelType.Object,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IModel<Type, Being, ModelType>
{
  readonly being: IOntology<Type, Being, Knowledge>;
  readonly knowledge: null;
  readonly type: Type;
}
