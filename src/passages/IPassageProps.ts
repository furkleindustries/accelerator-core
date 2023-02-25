import {
  IAcceleratorConfigAware,
} from '../interfaces/IAcceleratorConfigAware';
import {
  IClassNameable,
} from '../interfaces/IClassNameable';
import {
  IDispatchAware,
} from '../interfaces/IDispatchAware';
import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  IPassageAware,
} from '../interfaces/IPassageAware';
import {
  IPassageFunctions,
} from './IPassageFunctions';
import {
  IReduxStoreAware,
} from '../interfaces/IReduxStoreAware';
import {
  ISoundManagerAware,
} from '../interfaces/ISoundManagerAware';
import {
  IStoryEndedAware,
} from '../interfaces/IStoryEndedAware';
import {
  IStoryStateAware,
} from '../interfaces/IStoryStateAware';

export type IPassageProps =
  IAcceleratorConfigAware &
    IClassNameable &
    IDispatchAware &
    ILastLinkTagsAware &
    IPassageAware &
    IPassageFunctions &
    IReduxStoreAware &
    IStoryEndedAware &
    IStoryStateAware &
    ISoundManagerAware;
