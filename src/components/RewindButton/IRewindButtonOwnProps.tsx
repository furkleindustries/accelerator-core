import {
  IButtonOwnProps,
} from '../Button/IButtonOwnProps';

export interface IRewindButtonOwnProps extends IButtonOwnProps {
  readonly soundGroupsToStop?: string[];
}
