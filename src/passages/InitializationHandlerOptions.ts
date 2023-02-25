import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IAction,
} from '../actions/IAction';
import {
  IGroupsDefinitionMap,
} from '../../passages/_sounds/ISoundsDefinitionMap';
import {
  ImagePreloadMap,
} from '../configuration/ImagePreloadMap';
import {
  IState,
} from '../state/IState';
import type {
  Store,
} from 'redux';
import type {
  IManager,
} from 'sound-manager';

export interface InitializationHandlerOptions {
  readonly appDocumentSelector: string;
  readonly config: IAcceleratorConfigNormalized;
  readonly fadeOutDuration: number;
  readonly imagesToPreload: ImagePreloadMap;
  readonly loadDocumentSelector: string;
  readonly soundGroups: IGroupsDefinitionMap;
  readonly soundManager: IManager;
  readonly store: Store<IState, IAction>;
}
