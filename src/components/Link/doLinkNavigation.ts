import {
  ILinkNavigationProps,
} from './ILinkNavigationProps';
import {
  navigate,
} from '../../state/navigate';
import {
  assert,
} from 'ts-assertions';

export const strings = {
  PASSAGE_DOES_NOT_EXIST:
    'The passageName argument, %name%, does not match any passages within ' +
      'the passages map.',
};

export function doLinkNavigation({
  dispatch,
  passageObject: passage,
  passageName,
  tags: linkTags,
}: ILinkNavigationProps) {
  assert(
    passage,
    strings.PASSAGE_DOES_NOT_EXIST.replace(
      /%name%/gi,
      passageName || '(No name)',
    ),
  );

  navigate({
    dispatch,
    passage,
    linkTags,
  });
}