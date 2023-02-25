import {
  PassageNames,
} from '../passages/IPassagesMap';

export interface IStorySerializationPointer {
  readonly currentPassageName: PassageNames;
  readonly lastModified: number;
  readonly saveName: string;
  readonly uuid: string;
}
