import {
  addTag,
} from '../../tags/addTag';
import {
  AwarenessRelation,
} from '../relations/AwarenessRelation';
import {
  BeingNoThoughtsBase,
} from './BeingNoThoughtsBase';
import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  EpistemologyType,
} from './EpistemologyType';
import {
  getStructuredTags,
} from '../../tags/getStructuredTags';
import {
  getTag,
} from '../../tags/getTag';
import {
  IAwarenessRelation,
} from '../relations/IAwarenessRelation';
import {
  IEpistemology,
} from './IEpistemology';
import {
  IEpistemologyConstructorArgs,
} from './IEpistemologyConstructorArgs';
import {
  IThoughtRelation,
} from '../relations/IThoughtRelation';
import {
  IWorld,
} from '../world/IWorld';
import {
  ITag,
} from '../../tags/ITag';
import {
  ModelType,
} from '../models/ModelType';
import {
  removeTag,
} from '../../tags/removeTag';
import {
  Tag,
} from '../../tags/Tag';
import {
  assertValid,
} from 'ts-assertions';

export class Epistemology<
  Type extends EpistemicTypes | ModelType.Thought,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType
> implements IEpistemology<Type, Being, Knowledge> {
  /* Thoughts may not be "aware" of anything. */
  private readonly __awareness: Type extends EpistemicTypes ?
    IAwarenessRelation<Type, Being, Knowledge> :
    null =
      null as any;

  public get awareness() {
    return this.__awareness;
  }

  private readonly __modelType: Type;

  public get modelType() {
    return this.__modelType;
  }

  private __tags: ReadonlyArray<ITag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  } 

  private readonly __type: symbol = EpistemologyType;
  public get type() {
    return this.__type;
  } 

  private readonly __thoughts: IThoughtRelation<Type, Being, Knowledge>;
  public get thoughts() {
    return this.__thoughts;
  }

  private readonly __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(world: IWorld, args: IEpistemologyConstructorArgs<Type, Being, Knowledge>) {
    this.__world = assertValid(world);

    const {
      finalizer,
      initializer,
      modelType,
      tags,
    } = assertValid<IEpistemologyConstructorArgs<Type, Being, Knowledge>>(args);

    this.__modelType = assertValid(modelType);
    if (this.modelType !== ModelType.Thought) {
      this.__awareness = new AwarenessRelation();
    }

    if (tags) {
      this.__tags = getStructuredTags(assertValid<Tag[]>(
        tags,
        'The tags argument to the Epistemology constructor was not valid.',
        (arr) => Array.isArray(arr),
      ));
    }

    if (typeof finalizer === 'function') {
      this.finalize = finalizer;
    }

    if (typeof initializer === 'function') {
      this.initialize = initializer;
      this.initialize(this);
    }
  }

  public readonly addTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(addTag(this.tags, tag)))
  );

  public readonly clone = (): IEpistemology<Type, Being, Knowledge> => {
    const copy: IEpistemology<Type, Being, Knowledge> = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    // @ts-ignore
    copy.__awareness = this.awareness ?
      this.awareness.clone() :
      null;

    // @ts-ignore
    copy.finalize = typeof this.finalize === 'function' ?
      this.finalize.bind(copy) :
      null;

    // @ts-ignore
    copy.initialize = typeof this.initialize === 'function' ?
      // @ts-ignore
      this.initialize.bind(copy) :
      null;

    // @ts-ignore
    copy.__thoughts = this.thoughts ?
      this.thoughts.clone() :
      null;

    // @ts-ignore
    copy.world = this.world;

    return copy;
  };

  public readonly destroy = () => {
    if (typeof this.finalize === 'function') {
      this.finalize(this);
    }

    if (this.awareness) {
      this.awareness.destroy();
    }

    this.thoughts.destroy();

    this.tags.forEach(this.removeTag);

    ((self: any) => {
      delete self.__awareness;
      delete self.awareness;
      delete self.finalize;
      delete self.initialize;
      delete self.__thoughts;
      delete self.thoughts;
      delete self.__tags;
      delete self.tags;
    })(this);
  };

  public readonly getTag = (toSearch: Tag) => getTag(this.tags, toSearch);

  public readonly removeTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(removeTag(this.tags, tag)))
  );

  public readonly finalize?: (self: IEpistemology<Type, Being, Knowledge>) => void;
  public readonly initialize?: (self: IEpistemology<Type, Being, Knowledge>) => void;
}
