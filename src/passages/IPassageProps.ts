import { 
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IAction,
} from '../actions/IAction';
import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  IManager,
} from 'sound-manager';
import {
  IPassageFunctions,
} from './IPassageFunctions';
import {
  IPassage,
} from './IPassage';
import {
  IStoryStateAware,
} from '../interfaces/IStoryStateAware';
import {
  Dispatch,
} from 'redux';

export interface IPassageProps extends
  ILastLinkTagsAware,
  IPassageFunctions,
  IStoryStateAware
{
  readonly config: IAcceleratorConfigNormalized;
  readonly dispatch: Dispatch<IAction>;
  readonly passageObject: IPassage;
  readonly soundManager: IManager;
}
