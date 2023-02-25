import {
  createSoundManagerSoundStateUpdateAction,
} from '../actions/creators/createSoundManagerSoundStateUpdateAction';
import {
  getNiceValueString,
} from './getNiceValueString';
import {
  IStopSoundFuncArgs,
} from '../interfaces/IStopSoundFuncArgs';

export const stopSound = ({
  debug,
  dispatch,
  groupName,
  config: {
    loggers: {
      error,
      log,
    },
  },

  sound,
  sound: {
    getFade,
    getLabel,
    getLoop,
    getVolume,
    stop,
  },

  soundName,
}: IStopSoundFuncArgs) => setTimeout(() => {
  if (debug) {
    log('---- Sound Manager ----');
    log(`Stopping sound "${soundName}" from group "${groupName}" at ${new Date().toUTCString()}.`);
    log(`The fade is: ${getNiceValueString(getFade() || null)}`);
    log('--------');
  }

  delete (sound as any).__loopOverride;
  (sound as any).__fadeOnLoops = false;

  const fade = getFade();
  const label = getLabel();
  const loop = getLoop();
  const playing = false;
  const startedTime = 0;
  const volume = getVolume();

  dispatch(createSoundManagerSoundStateUpdateAction({
    fade,
    groupName,
    label,
    loop,
    playing,
    soundName,
    startedTime,
    volume,
  }));

  // Schedule a microtask to ensure play and pause do not clash. It
  // causes a DOM exception if play and pause are called on an audio
  // element in the same tick.
  stop().then(
    () => {
      if (debug) {
        log('---- Sound Manager ----');
        log(
          `The sound "${soundName}" from group "${groupName}" has completed fading out, and stopped, at ${new Date().toUTCString()}.`,
        );
  
        log('--------');
      }
    },

    (err) => {
      if (debug) {
        error('---- Sound Manager ----');
        error(
          `The sound "${soundName}" from group "${groupName}" has encountered an error while stopping.`,
        );
    
        error(err);
        error('---- ----');
      } else {
        error(err);
      }
    },
  );
});
