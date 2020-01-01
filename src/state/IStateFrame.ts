import {
  IPassageNamed,
} from '../interfaces/IPassageNamed';
import {
  IStoryStateAware,
} from '../interfaces/IStoryStateAware';
import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';

export interface IStateFrame extends
  ILastLinkTagsAware,
  IPassageNamed,
  IStoryStateAware
{
  readonly bookmarkCounter: number;
  readonly passageTimeCounter: number;
}
