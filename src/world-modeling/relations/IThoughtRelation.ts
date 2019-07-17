import {
  IFindModelArgs,
} from '../IFindModelArgs';
import {
  IModel,
} from '../IModel';
import {
  ModelType,
} from '../ModelType';
import {
  IWorld,
} from '../IWorld';

export interface IThoughtRelation<T extends ModelType> {
  readonly knows: ReadonlyArray<IModel<T>>;
  readonly name: string;
  readonly wants: ReadonlyArray<IModel<T>>;
  readonly world: IWorld;
  readonly addKnowledge: () => void;
  readonly find: (args: string | IFindModelArgs<T>) => IModel<T> | null;
  readonly findAll: (args: IFindModelArgs<T>) => ReadonlyArray<IModel<T>>;
}
