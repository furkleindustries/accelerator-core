import {
  InkSectionObject,
} from '../InkSection/InkSectionObject';

export interface InkContainerState {
  readonly choiceCounter: number;
  readonly sections: readonly InkSectionObject[];
}
