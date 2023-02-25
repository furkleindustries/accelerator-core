import {
  IDispatchAware,
} from '../../interfaces/IDispatchAware';
import {
  IPassageAware,
} from '../../interfaces/IPassageAware';
import {
  IPassageNamed,
} from '../../interfaces/IPassageNamed';
import {
  ITaggable,
} from '../../interfaces/ITaggable';

export interface ILinkNavigationProps
  extends
    IDispatchAware,
    IPassageAware,
    IPassageNamed,
    ITaggable
{}
