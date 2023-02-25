import {
  IBookmarkAction,
} from '../actions/IBookmarkAction';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IStoryEndAction,
} from '../actions/IStoryEndAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryRewindAction,
} from '../actions/IStoryRewindAction';
import {
  ISetStoryStateAware,
} from '../interfaces/ISetStoryStateAware';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageFunctions extends ISetStoryStateAware {
  readonly bookmark: () => IBookmarkAction;
  readonly endStory: () => IStoryEndAction;
  readonly navigateTo: (
    passageName: string,
    linkTags?: MaybeReadonlyArray<Tag>,
  ) => IPassageNavigationAction;

  readonly restart: () => IStoryResetAction;
  readonly rewind: () => IStoryRewindAction;
}
