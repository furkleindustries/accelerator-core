import {
  configurationDefaults,
} from '../configuration/configurationDefaults';
import {
  IAcceleratorSoundManagerConfigurationNormalized,
} from '../configuration/IAcceleratorSoundManagerConfigurationNormalized';
import type {
  IGroupsMap,
} from 'sound-manager/src/Manager/IGroupsMap';

const {
  soundManager: {
    defaults: {
      fade: {
        easingCurve: defaultEasingCurve,
        length: defaultLength,
      },
    },
  },
} = configurationDefaults;

export const stopAllSoundsAutomatically = (
  groups: IGroupsMap,
  ignores: IAcceleratorSoundManagerConfigurationNormalized['excludeFromAutomaticStop'],
) => {
  Object.keys(groups).forEach((groupName) => {
    if (ignores.groups.includes(groupName)) {
      return;
    }

    const group = groups[groupName];
    
    Object.keys(group.sounds).forEach((soundName: string) => {
      if (ignores.sounds.includes(soundName)) {
        return;
      }

      const sound: any = group.sounds[soundName];
  
      // Force the song to fade out quickly.
      sound.__fadeOverride = {
        easingCurve: {
          in: sound.__fadeOverride?.easingCurve?.in || defaultEasingCurve.in,
          out: defaultEasingCurve.out,
        },

        length: {
          in: sound.__fadeOverride?.length?.in || defaultLength.in,
          out: defaultLength.out,
        },
      };

      setTimeout(() => {
        sound.stop();
      }, 556);

      setTimeout(() => {
        delete sound.__fadeOverride;
      }, defaultLength.out + 6);
    });
  });
}