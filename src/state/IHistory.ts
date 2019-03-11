import {
  IStateFrame,
} from './IStateFrame';

export interface IHistory {
  readonly past: ReadonlyArray<IStateFrame>;
  readonly present: IStateFrame;
  readonly future: ReadonlyArray<IStateFrame>;
}
