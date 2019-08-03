import {
  ContainableTypes,
} from './ContainableTypes';
import {
  ContainmentTypes,
} from './ContainmentTypes';
import {
  IContainmentRelation,
} from './IContainmentRelation';
import {
  RelationBase,
} from './RelationBase';

export class ContainmentRelation<
  Type extends ContainmentTypes,
  Being extends ContainableTypes,
> extends RelationBase<Type>
  implements IContainmentRelation<Type, Being>
{
  
}