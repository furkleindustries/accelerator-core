import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  Tag,
} from '../../tags/Tag';

export interface IAdjacencyRelationConstructorArgs<Type extends OnticTypes> {
  readonly modelType: Type;
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
}
