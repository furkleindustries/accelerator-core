import {
  InkContainersStateInitAction,
} from '../../actions/InkContainersStateInitAction';
import {
  InkContainersStateUpdateAction,
} from '../../actions/InkContainersStateUpdateAction';
import {
  InkContainersUnregistrationAction,
} from '../../actions/InkContainersUnregistrationAction';
import {
  InkModule,
} from './InkModule';
import {
  IPassageNavigationAction,
} from '../../actions/IPassageNavigationAction';
import {
  PassageNames,
} from '../../passages/IPassagesMap';
import {
  IPassageTimeAction,
} from '../../actions/IPassageTimeAction';
import {
  IStoryStateAction,
} from '../../actions/IStoryStateAction';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';
import type {
  AnyAction,
  Dispatch,
} from 'redux';
import type {
  Story,
} from 'inkjs/engine/Story';

export interface InkContainerDispatchProps {
  readonly advancePassageTime: () => IPassageTimeAction;
  readonly dispatch: Dispatch<AnyAction>;
  readonly navigateTo: (passageName: PassageNames) => IPassageNavigationAction;
  readonly registerInkContainer: () => Promise<{
    readonly inkModule: InkModule;
    readonly story: Story;
  }>;

  readonly setStoryState: (
    updatedState: Partial<IStoryStateFrame>,
    lastPassageName: string,
  ) => IStoryStateAction;

  readonly sendInitInkState: (story: Story) => InkContainersStateInitAction;
  readonly updateInkContainerState: (story: Story) => InkContainersStateUpdateAction;
  readonly unregisterInkContainer: (story: Story) => InkContainersUnregistrationAction;
}
