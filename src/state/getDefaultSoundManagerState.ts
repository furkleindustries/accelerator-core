import {
  configurationDefaults,
} from '../configuration/configurationDefaults';

const {
  soundManager: {
    defaults: { volume },
  },
} = configurationDefaults;

export const getDefaultSoundManagerState = () => ({
  groups: {
    'default': {
      groupName: 'default',
      label: {
        artistName: '',
        contributors: [],
        license: '',
        title: 'Default sounds',
      },

      volume,
    }
  },

  sounds: {},
  managerVolume: 1,
});
