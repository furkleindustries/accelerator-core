import {
  IPassagesMap,
  PassageNames,
} from '../../passages/IPassagesMap';

export interface ICurrentDisplayNameOwnProps {
  readonly className?: string;
  readonly currentPassageName: PassageNames;
  readonly passagesMap: IPassagesMap;
}
