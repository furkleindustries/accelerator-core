import {
  IStateFrame,
} from './IStateFrame';

export interface IHistory {
  readonly past: IStateFrame[];
  readonly present: IStateFrame;
  readonly future: IStateFrame[];
}
