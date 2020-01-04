import {
  IAcceleratorConfigAware,
} from '../../interfaces/IAcceleratorConfigAware';
import {
  ILastLinkTagsAware,
} from '../../interfaces/ILastLinkTagsAware';
import {
  IPassageAware,
} from '../../interfaces/IPassageAware';
import {
  IPassageFunctions,
} from '../../passages/IPassageFunctions';
import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import {
  IStoryStateAware,
} from '../../interfaces/IStoryStateAware';

export interface IPassageContentContainerOwnProps extends
  IAcceleratorConfigAware,
  ILastLinkTagsAware,
  IPassageAware,
  IPassageFunctions,
  ISoundManagerAware,
  IStoryStateAware
{
}
