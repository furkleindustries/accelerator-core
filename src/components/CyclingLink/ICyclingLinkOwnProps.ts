export interface ICyclingLinkOwnProps {
  readonly children: string[];
  readonly className?: string;
  readonly dontCallbackOnMount?: boolean;
  readonly dontSetVariableOnMount?: boolean;
  readonly variableToSet?: string;
  callback?(current?: string): void;
}
