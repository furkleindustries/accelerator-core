import {
  ISoundManagerStateFrame,
} from '../../state/ISoundManagerStateFrame';

export interface ISoundManagerViewStateProps {
  readonly debug: boolean;
  readonly groupsState: ISoundManagerStateFrame['groups'];
  readonly soundsLoaded: boolean;
}
