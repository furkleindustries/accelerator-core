import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  ModelType,
} from './ModelType';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  IWorld,
} from '../world/IWorld';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  ITag,
} from '../../tags/ITag';
import {
  Tag,
} from '../../tags/Tag';

export interface IModel<
  Type extends ModelType,
  Being extends OnticTypes = never,
  Knowledge extends ModelType = never,
> {
  readonly being: Type extends OnticTypes ?
    IOntology<Type, Being> :
    null;

  /* Note that Thought models are not included in the epistemic types. This is
   * because thought models are intended to be a thin affordance for globally
   * generic thoughts or concepts, and these models cannot "know" anything at
   * all. */
  readonly knowledge: Type extends EpistemicTypes ?
    IEpistemology<Type, Knowledge> :
    null;

  readonly name: string;
  readonly tags: ReadonlyArray<ITag>;
  readonly type: Type;
  readonly world: IWorld;

  readonly addTag: (tag: Tag) => void;
  readonly clone: () => IModel<Type, Being, Knowledge>;
  readonly destroy: () => void;
  readonly finalize: (self: IModel<Type, Being, Knowledge>) => void;
  readonly getTag: (toSearch: Tag) => ITag | null;
  readonly initialize: (self: IModel<Type, Being, Knowledge>) => void;
  readonly removeTag: (toSearch: Tag) => void;
}
