import {
  ActionCreators,
} from 'redux-undo';

export function createStoryRewindAction(index?: number) {
  if (index) {
    return ActionCreators.jumpToPast(index);
  }

  return ActionCreators.undo();
}
