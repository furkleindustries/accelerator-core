import {
  LoggerFunc,
} from 'colorful-logging/LoggerFunc';
import {
  LogTypes,
} from 'colorful-logging/LogTypes';

export type IAcceleratorLoggersConfiguration = {
  readonly [key in LogTypes]: LoggerFunc;
};
