import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  InkContainerStateFrame,
} from './InkContainerStateFrame';
import {
  IPassageNamed,
} from '../interfaces/IPassageNamed';
import {
  IStoryStateAware,
} from '../interfaces/IStoryStateAware';

export interface IStateFrame extends
  ILastLinkTagsAware,
  IPassageNamed,
  IStoryStateAware
{
  readonly bookmarkCounter: number;
  readonly inkContainers: Record<string, InkContainerStateFrame>;
  readonly passageTimeCounter: number;
  readonly storyEnded: boolean;
}
