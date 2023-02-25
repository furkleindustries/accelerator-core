import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  isInDebugMode,
} from './isInDebugMode';

export const computeStartPassageNameWithDebug = ({
  debug,
  debugOptions,
  startPassageName,
}: IAcceleratorConfigNormalized) => {
  const isDebug = isInDebugMode(debug);

  if (isDebug && debugOptions && debugOptions.startPassageAfterMenu) {
    return debugOptions.startPassageAfterMenu;
  }

  return startPassageName;
};
