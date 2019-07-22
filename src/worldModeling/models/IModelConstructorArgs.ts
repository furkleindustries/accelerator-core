import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  Tag,
} from '../../tags/Tag';

export interface IModelConstructorArgs<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> {
  readonly name: string;
  readonly type: Type;
  readonly being?: Type extends OnticTypes ?
    IOntology<Type, Being, Knowledge> :
    null;

  readonly knowledge?: Type extends EpistemicTypes ?
    IEpistemology<Type, Being, Knowledge> :
    null;

  readonly tags?: Array<string | Tag> | ReadonlyArray<string | Tag>;
}
