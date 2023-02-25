import {
  IAcceleratorConfigAware,
} from '../../interfaces/IAcceleratorConfigAware';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  InitializationProgressUpdater,
} from '../../passages/InitializationProgressUpdater';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ILoadingScreenOwnProps
  extends IClassNameable,
    IAcceleratorConfigAware
{
  readonly addProgressListener: (callback: InitializationProgressUpdater) => void;
  readonly completeLoad: () => void;
  readonly fadeOutDuration: number;
  readonly initialDescription?: string;
  readonly onDescriptionChange: (callback: (description: string) => void) => void;
  readonly progressMax: number;
  readonly bodyText?: string;
  readonly logoPath?: string;
  readonly startButtonContent?: ReactNodeWithoutNullOrUndefined;
  readonly title?: string;
}
