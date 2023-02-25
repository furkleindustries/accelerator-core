import {
  IStoryOption,
} from '../../storyOptions/IStoryOption';

export const precedenceSortOptions = (options: readonly IStoryOption[]) => (
  Object.freeze([ ...options ].sort((aa, bb) => {
    if (typeof aa.precedence === 'undefined' && typeof bb.precedence === 'undefined') {
      return 0;
    } else if (typeof aa.precedence === 'undefined') {
      return -1;
    } else if (typeof bb.precedence === 'undefined') {
      return 1;
    } else if (aa.precedence < bb.precedence) {
      return -1;
    } else if (aa.precedence > bb.precedence) {
      return 1;
    }

    return 0;
  }))
);
