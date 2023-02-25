import {
  ISoundManagerStateFrame,
} from '../../state/ISoundManagerStateFrame';

export const sortSoundManagerState = (
  {
    groups,
    managerVolume,
    sounds,
  }: ISoundManagerStateFrame,
): ISoundManagerStateFrame => ({
  groups: Object.keys(groups)
    .sort((aa, bb) => {
      const aaStartsWithXlr8r = aa.startsWith('XLR8R');
      const bbStartsWithXlr8r = bb.startsWith('XLR8R');
      if (aaStartsWithXlr8r || bbStartsWithXlr8r) {
        if (aaStartsWithXlr8r && !bbStartsWithXlr8r) {
          return -1;
        } else if (bbStartsWithXlr8r && !aaStartsWithXlr8r) {
          return 1;
        }
      }

      if (aa > bb) {
        return 1;
      } else if (bb > aa) {
        return -1;
      }

      return 0;
    }).reduce(
      (prev, key) => ({
        ...prev,
        [key]: groups[key],
      }),
      {},
    ),

  managerVolume,
  sounds: Object.keys(sounds).sort().reduce(
    (prev, key) => ({
      ...prev,
      [key]: sounds[key],
    }),
    {},
  ),
});
