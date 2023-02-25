import {
  IPassageNavigationAction,
} from '../../../bundles/passagesBundle';
import type {
  Dispatch,
} from 'redux';

export interface IDebugPassageSelectorDispatchProps {
  readonly dispatch: Dispatch<IPassageNavigationAction>;
}
