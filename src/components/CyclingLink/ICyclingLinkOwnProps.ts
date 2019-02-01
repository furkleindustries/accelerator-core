export interface ICyclingLinkOwnProps {
  children: string[];
  className?: string;
  dontCallbackOnMount?: boolean;
  dontSetVariableOnMount?: boolean;
  variableToSet?: string;
  callback?(current?: string): void;
}
