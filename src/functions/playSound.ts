import {
  createSoundManagerSoundStateUpdateAction,
} from '../actions/creators/createSoundManagerSoundStateUpdateAction';
import {
  IPlaySoundFuncArgs,
} from '../interfaces/IPlaySoundFuncArgs';
import {
  looksLikeANumber,
} from './looksLikeANumber';
import {
  EasingCurves,
  IFade,
  isValidVolume,
  ISound,
} from 'sound-manager';

export const playSound = ({
  config: {
    loggers: {
      error,
      log,
    },

    soundManager: {
      defaults: {
        fade: {
          easingCurve: defaultEasingCurve,
          length: defaultFadeLength,
        },
      },
    },
  },

  debug,
  dispatch,
  fade: fadeOverride,
  fadeOnLoops,
  getSoundManager,
  groupName = 'default',
  loop: loopOverride,
  soundName,
  volume: volumeOverride,
}: IPlaySoundFuncArgs) => {
  setTimeout(() => {
    const soundManager = getSoundManager();
    const {
      collection: { getSound },
    } = soundManager;

    const sound = getSound(soundName, groupName) as ISound & { __fadeOnLoops: boolean };
    const {
      __fadeOnLoops,
      getDuration,
      getFade,
      getLabel,
      getLoop,
      getVolume,
      play,
      setVolume,
    } = sound;

    let loopOverrideVal: boolean | undefined;
    if (typeof loopOverride === 'boolean') {
      loopOverrideVal = loopOverride;
    } else if (typeof loopOverride === 'string') {
      if (loopOverride.trim().toLowerCase() === 'true') {
        loopOverrideVal = true;
      } else if (loopOverride.trim().toLowerCase() === 'false') {
        loopOverrideVal = false;
      }
    }

    let fadeOverrideVal: IFade | undefined;
    if (fadeOverride) {
      const tempFadeArg: IFade = {
        easingCurve: defaultEasingCurve,
        length: defaultFadeLength,
      };

      let seenCurveIn = false;
      let seenCurveOut = false;
      let seenLenIn = false;
      let seenLenOut = false;
      if (typeof fadeOverride === 'string') {
        const split = fadeOverride.split(new RegExp(/,\s+/g));
        split.forEach((item) => {
          const trimmed = item.trim().toLowerCase();

          if (looksLikeANumber(trimmed)) {
            let asNum = Number(trimmed);
            asNum = asNum >= 0 ? asNum : 0;
            if (seenLenIn) {
              tempFadeArg.length.out = asNum;
              seenLenOut = true;
            } else {
              tempFadeArg.length.in = asNum;
              seenLenIn = true;
            }
          } else if (Object.values(EasingCurves).includes(trimmed as any)) {
            if (seenCurveIn) {
              tempFadeArg.easingCurve.out = trimmed as any;
              seenCurveOut = true;
            } else {
              tempFadeArg.easingCurve.in = trimmed as any;
              seenCurveIn = true;
            }
          }
        });
      } else {
        if (fadeOverride.easingCurve) {
          if (typeof fadeOverride.easingCurve.in === 'string') {
            tempFadeArg.easingCurve.in = fadeOverride.easingCurve.in;
          }

          if (typeof fadeOverride.easingCurve.out === 'string') {
            tempFadeArg.easingCurve.out = fadeOverride.easingCurve.out;
          }
        }

        if (fadeOverride.length) {
          if (fadeOverride.length.in! > 0) {
            tempFadeArg.length.in = fadeOverride.length.in;
          }

          if (fadeOverride.length.out! > 0) {
            tempFadeArg.length.out = fadeOverride.length.out;
          }
        }
      }

      if (seenCurveOut && !seenCurveOut) {
        tempFadeArg.easingCurve.out = tempFadeArg.easingCurve.in;
      }

      if (seenLenIn && !seenLenOut) {
        tempFadeArg.length.out = tempFadeArg.length.in;
      }

      fadeOverrideVal = { ...tempFadeArg };
    }

    let fadeOnLoopsArg = __fadeOnLoops;
    if (typeof fadeOnLoops === 'boolean') {
      fadeOnLoopsArg = fadeOnLoops;
    } else if (typeof fadeOnLoops === 'string') {
      const trimmed = fadeOnLoops.trim().toLowerCase();
      if (trimmed === 'true') {
        fadeOnLoopsArg = true;
      } else if (trimmed === 'false') {
        fadeOnLoopsArg = false;
      }
    }

    const vol = Number(volumeOverride);
    if (isValidVolume(vol)) {
      setVolume(vol);
    }

    dispatch(createSoundManagerSoundStateUpdateAction({
      groupName,
      fade: getFade(),
      label: getLabel(),
      loop: getLoop(),
      playing: true,
      soundName,
      startedTime: new Date().getTime(),
      volume: getVolume(),
    }));

    const handleStop = () => setTimeout(() => {
      dispatch(createSoundManagerSoundStateUpdateAction({
        groupName,
        fade: getFade(),
        label: getLabel(),
        loop: getLoop(),
        playing: false,
        soundName,
        startedTime: 0,
        volume: getVolume(),
      }));
    }, 5);

    play({
      fadeOverride: fadeOverrideVal,
      fadeOnLoops: fadeOnLoopsArg,
      loopOverride: loopOverrideVal,
    }).then(
      handleStop,
      (err) => {
        if (debug) {
          error('---- Sound Manager ----');
          error(
            `The sound "${soundName}" from group "${groupName}" has encountered an error while playing.`,
          );
    
          error(err);
          error('---- ----');
        } else {
          error(err);
        }
      },
    );

    if (debug) {
      log('---- Sound Manager ----');
    
      log(
        `Playing sound "${soundName}" ` +
          `from group "${groupName}" ` +
          `at ${new Date().toUTCString()}.`,
      );
    
      log(
        `The sound "${groupName}/${soundName}" ` +
    
          `has duration ${Math.round(getDuration())}, ` +
    
          `volume ${getVolume()}, ` +
    
          `fade ${JSON.stringify(
            (fadeOverrideVal === undefined ?
              getFade() :
              fadeOverrideVal) || null,
          )}, and ` +
    
          `loop ${loopOverrideVal === undefined ?
              getLoop() :
              loopOverrideVal}. ` +
            `It will${fadeOnLoopsArg ? '' : ' not'} fade on loops.`,
      );
    
      log('--------');
    }
  }, 50)
};
