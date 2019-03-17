import {
  IAction,
} from '../actions/IAction';
import {
  IPassageFunctions,
} from './IPassageFunctions';
import {
  IManager,
} from 'sound-manager';
import {
  IPassage,
} from './IPassage';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageProps extends IPassageFunctions {
  readonly dispatch: Dispatch<IAction>;
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageObject: IPassage;
  readonly soundManager: IManager;
  readonly storyState: IStoryStateFrame;
}
