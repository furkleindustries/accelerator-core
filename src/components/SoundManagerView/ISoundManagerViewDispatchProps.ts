import {
  ISoundManagerStateUpdateAction,
} from '../../actions/ISoundManagerStateUpdateAction';
import type {
  Dispatch,
} from 'redux';

export interface ISoundManagerViewDispatchProps {
  readonly dispatch: Dispatch<ISoundManagerStateUpdateAction>;
}
