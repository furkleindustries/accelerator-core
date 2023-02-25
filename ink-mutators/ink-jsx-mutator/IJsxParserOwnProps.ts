import type {
  ComponentType,
} from 'react';

export interface IJsxParserOwnProps {
  readonly jsx: string;
  readonly onError: (err?: Error) => void;
  readonly allowUnknownElements?: boolean;
  readonly bindings?: Record<string, any>;
  readonly components?: Record<string, ComponentType<any>>;
  readonly componentsOnly?: boolean;
  readonly denylistedAttrs?: RegExp[];
  readonly denylistedTags?: string[];
  readonly disableKeyGeneration?: boolean;
  readonly showWarnings?: boolean;
}