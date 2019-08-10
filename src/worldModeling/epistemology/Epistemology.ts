import {
  addTag,
} from '../../tags/addTag';
import {
  AwarenessRelation,
} from '../relations/AwarenessRelation';
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
  isEpistemicType,
} from '../typeGuards/isEpistemicType';
import {
  ISerializedEpistemology,
} from './ISerializedEpistemology';
import {
  isOnticType,
} from '../typeGuards/isOnticType';
import {
  isModelType,
} from '../typeGuards/isModelType';
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
  OnticTypes,
} from '../ontology/OnticTypes';
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
  Knowledge extends ModelType = ModelType,
> implements IEpistemology<Type, Knowledge> {
  /* Thoughts may not be "aware" of anything. Other types need both ontic and
   * epistemic aspects in order to be aware. */
  private readonly __awareness: Type extends EpistemicTypes & OnticTypes ?
    IAwarenessRelation<Type, Knowledge> :
    null;

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

  private readonly __thoughts: IThoughtRelation<Type, Knowledge>;
  public get thoughts() {
    return this.__thoughts;
  }

  private readonly __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(world: IWorld, args: IEpistemologyConstructorArgs<Type, Knowledge>) {
    this.__world = assertValid(world);

    const {
      finalize,
      initialize,
      modelType,
      tags,
    } = assertValid<IEpistemologyConstructorArgs<Type, Knowledge>>(args);

    this.__modelType = assertValid<Type>(
      modelType,
      'The value of the modelType argument did not meet the isModelType ' +
        'type guard.',

      isModelType,
    );

    if (isEpistemicType(this.modelType) && isOnticType(this.modelType)) {
      // @ts-ignore
      this.__awareness = (
        new AwarenessRelation<any, Knowledge>(
          this.world,
          this.modelType,
        )
      );
    }

    if (tags) {
      this.__tags = getStructuredTags(assertValid<Tag[]>(
        tags,
        'The tags argument to the Epistemology constructor was not valid.',
        Array.isArray,
      ));
    }

    if (typeof finalize === 'function') {
      this.finalize = finalize;
    }

    if (typeof initialize === 'function') {
      this.initialize = initialize;
      initialize(this);
    }
  }

  public readonly addTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(addTag(this.tags, tag)))
  );

  public readonly clone = (): IEpistemology<Type, Knowledge> => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    copy.__awareness = this.awareness ?
      this.awareness.clone() :
      null;

    copy.finalize = typeof this.finalize === 'function' ?
      this.finalize.bind(copy) :
      null;

    copy.initialize = typeof this.initialize === 'function' ?
      this.initialize.bind(copy) :
      null;

    copy.__thoughts = this.thoughts ?
      this.thoughts.clone() :
      null;

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

  public readonly serialize = (
    self: IEpistemology<Type, Knowledge>,
    spaces: number = 0,
  ) => JSON.stringify(self.serializeToObject(self), null, spaces);

  public readonly serializeToObject = (
    self: IEpistemology<Type, Knowledge>,
  ): ISerializedEpistemology => ({
    awareness: self.awareness ?
      self.awareness.serializeToObject(self.awareness!) :
      null,

    modelType: self.modelType,
    tags: [ ...self.tags ],
    thoughts: self.thoughts.serializeToObject(self.thoughts),
  });

  public readonly finalize?: (
    self: IEpistemology<Type, Knowledge>,
  ) => void;

  public readonly initialize?: (
    self: IEpistemology<Type, Knowledge>,
  ) => void;
}
