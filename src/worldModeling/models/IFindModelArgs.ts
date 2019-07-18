import {
  IModel,
} from './IModel';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IFindModelArgs<T extends ModelType> {
  readonly ancestors?: string | Array<string | ModelType | IModel<T>>;
  readonly children?: string | Array<string | ModelType | IModel<T>>;
  readonly descendants?: string | Array<string | ModelType | IModel<T>>;
  readonly name?: string;
  readonly parent?: string | ModelType | IModel<T>;
  readonly tags?: Tag[];
  readonly type?: T;
}
