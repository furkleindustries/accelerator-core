import {
  IStoryStateSavePointerMap,
} from '../../src/state/IStoryStateSavePointerMap';
import {
  PassageNames,
} from '../../src/passages/IPassagesMap';

export interface ISaveManagerOptionStateProps {
  readonly currentPassageName: PassageNames;
  readonly currentSaveUuid: string;
  readonly storyStateSavePointers: IStoryStateSavePointerMap;
}
