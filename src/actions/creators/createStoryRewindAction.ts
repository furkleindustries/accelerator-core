import {
  ActionCreators,
} from 'redux-undo';

export const createStoryRewindAction = () => (
  ActionCreators.undo()
);
