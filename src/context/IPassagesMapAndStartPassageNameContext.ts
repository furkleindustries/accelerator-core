import {
  IPassagesMap,
} from '../../passages/IPassagesMap';

export interface IPassagesMapAndStartPassageNameContext {
  readonly passagesMap: IPassagesMap;
  readonly startPassageName: string;
};
