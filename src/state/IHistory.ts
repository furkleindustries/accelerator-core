import {
  IStateFrame,
} from './IStateFrame';

export interface IHistory {
  readonly past: readonly IStateFrame[];
  readonly present: IStateFrame;
}
