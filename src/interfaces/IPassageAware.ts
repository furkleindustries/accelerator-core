import {
  IPassage,
} from '../passages/IPassage';

export interface IPassageAware {
  readonly passageObject: IPassage;
}
