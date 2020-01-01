import {
  ActionTypes
} from '../actions/ActionTypes';
import {
  BuiltInRenderers,
} from '../renderers/BuiltInRenderers';
import {
  IFontLoadingDetails,
} from '../fonts/IFontLoadingDetails';
import {
  IFontSubsettingDetails,
} from '../fonts/IFontSubsettingDetails';
import {
  ITaggable,
} from '../interfaces/ITaggable';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';

export interface IAcceleratorConfig extends
  Record<string, any>,
  ITaggable
{
  readonly coreVersion: string;
  readonly debug: boolean;
  readonly historyStackLimit: number;
  readonly historySaveTypes: ActionTypes | MaybeReadonlyArray<ActionTypes>;
  readonly historySynchronizeUnrewindableStateWithPresent: boolean;
  readonly publicUrl: string;
  readonly rendererName: BuiltInRenderers | string;
  readonly showMenu: boolean;
  readonly storyDescription: string;
  readonly storyTitle: string;
  readonly toolVersion: string;
  readonly fontsToLoad?: MaybeReadonlyArray<IFontLoadingDetails> | string;
  readonly subsetFont?: IFontSubsettingDetails | string;
}
