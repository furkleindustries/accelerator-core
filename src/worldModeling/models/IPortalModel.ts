import {
  IModel,
} from './IModel';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';

export interface IPortalModel<
  Type extends ModelType.Portal,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IModel<Type, Being, ModelType>
{
  readonly being: IOntology<Type, Being, Knowledge>;
  readonly knowledge: null;
  readonly type: Type;
  readonly transport: (
    model: string | IModel<ModelType, ModelType, ModelType>,
  ) => void;
}
