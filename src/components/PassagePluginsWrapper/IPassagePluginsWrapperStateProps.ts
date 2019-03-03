import {
  Tag,
} from '../../tags/Tag';

export interface IPassagePluginsWrapperStateProps {
  readonly lastLinkTags: ReadonlyArray<Tag>;
  readonly passageName: string;
}
