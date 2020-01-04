import {
  IAcceleratorConfigAware,
} from '../interfaces/IAcceleratorConfigAware';
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
  ISoundManagerAware,
} from '../interfaces/ISoundManagerAware';
import {
  IStoryStateAware,
} from '../interfaces/IStoryStateAware';

export interface IPassageProps extends
  IAcceleratorConfigAware,
  IDispatchAware,
  ILastLinkTagsAware,
  IPassageAware,
  IPassageFunctions,
  IStoryStateAware,
  ISoundManagerAware
{
}
