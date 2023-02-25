import {
  ISoundManagerGroupStateFrame,
} from '../../state/ISoundManagerGroupStateFrame';
import {
  ISoundManagerStateFrame,
} from '../../state/ISoundManagerStateFrame';

export interface ISoundGroupControllerStateProps {
  readonly groupState: ISoundManagerGroupStateFrame;
  readonly soundsState: ISoundManagerStateFrame['sounds'];
}
