import {
  PassageNames,
} from '../../passages/IPassagesMap';
import {
  IStoryStateSavePointerMap,
} from '../../state/IStoryStateSavePointerMap';

export interface IStoryStateSaveLoadViewStateProps {
  readonly currentPassageName: PassageNames;
  readonly currentSaveUuid: string;
  readonly storyStateSavePointers: IStoryStateSavePointerMap;
}
