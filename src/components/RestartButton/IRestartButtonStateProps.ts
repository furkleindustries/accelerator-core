import {
  ILastLinkTagsAware,
} from '../../interfaces/ILastLinkTagsAware';
import {
  IPassageNamed,
} from '../../interfaces/IPassageNamed';
import {
  IStoryStateAware,
} from '../../interfaces/IStoryStateAware';

export interface IRestartButtonStateProps extends
  ILastLinkTagsAware,
  IPassageNamed,
  IStoryStateAware
{
}
