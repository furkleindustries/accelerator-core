import {
  PassageNames,
} from '../../passages/IPassagesMap';

export interface IStartScreenChoicesOwnProps {
  readonly className?: string;
  readonly creditsRedirector: () => void;
  readonly configStartPassageName: PassageNames;
  readonly loadAutosaveAtStart: boolean;
  readonly newGameCounter: number;
  readonly notesRedirector: () => void;
  readonly startPassageName: PassageNames;
  readonly startRedirector: () => void;
}
