import {
  AriaAttributes,
  InputHTMLAttributes,
} from 'react';

export interface InputOwnProps
  extends
    AriaAttributes,
    InputHTMLAttributes<HTMLInputElement>
{}
