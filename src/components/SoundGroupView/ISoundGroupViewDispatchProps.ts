import {
  ISoundManagerStateUpdateAction,
} from '../../actions/ISoundManagerStateUpdateAction';
import type {
  Dispatch,
} from 'redux';

export interface ISoundGroupViewDispatchProps {
  readonly dispatch: Dispatch<ISoundManagerStateUpdateAction>;
}
