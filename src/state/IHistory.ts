import {
  IStateFrame,
} from './IStateFrame';

export interface IHistory {
  past: IStateFrame[];
  present: IStateFrame;
  future: IStateFrame[];
}
