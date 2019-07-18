import {
  IFindModelArgs,
} from '../models/IFindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IWorld,
} from '../models/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IRelation<T extends ModelType> {
  readonly name: string;
  readonly tags: ReadonlyArray<Tag>;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly removeTag: (tag: Tag) => void;
  readonly find: (args: string | IFindModelArgs<T>) => IModel<T> | null;
  readonly findAll: (args: IFindModelArgs<T>) => IModel<T>[];
}
