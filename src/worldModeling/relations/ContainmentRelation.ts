import {
  ContainableTypes,
} from './ContainableTypes';
import {
  ContainingTypes,
} from './ContainingTypes';
import {
  IContainmentRelation,
} from './IContainmentRelation';
import {
  RelationBase,
} from './RelationBase';

export class ContainmentRelation<
  Type extends (ContainableTypes | ContainingTypes),
  Being extends ContainableTypes,
> extends RelationBase<Type>
  implements IContainmentRelation<Type, Being>
{
  
}