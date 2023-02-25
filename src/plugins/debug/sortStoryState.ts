import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';

export const sortStoryState = (storyState: IStoryStateFrame) => (
  Object.keys(storyState)
    .sort((aa, bb) => {
      if (aa === 'DEBUG' || bb === 'DEBUG') {
        if (aa !== 'DEBUG') {
          return 1;
        } else if (bb !== 'DEBUG') {
          return -1;
        }
      } else if (aa.startsWith('XLR8R_') || bb.startsWith('XLR8R_')) {
        if (!aa.startsWith('XLR8R_')) {
          return 1;
        } else if (!bb.startsWith('XLR8R_')) {
          return -1;
        } else if (aa < bb) {
          return -1;
        } else if (bb > aa) {
          return 1;
        }
      }

      return 0;
    })
    .reduce(
      (prev, key) => ({
        ...prev,
        [key]: storyState[key],
      }),
      {},
    )
);
