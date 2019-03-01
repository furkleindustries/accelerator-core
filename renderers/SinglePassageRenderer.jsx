import {
  navigate,
} from '../src/state/navigate';
import {
  Passage,
} from '../src/components/Passage/Passage';
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export class SinglePassageRenderer {
  config = null;
  context = null;

  constructor(config, context) {
    this.config = assertValid(config);
    this.context = assertValid(context);
  }

  render = () => (
    <Passage
      footers={this.context.footers}
      headers={this.context.headers}
      passagesMap={this.context.passagesMap}
      plugins={this.context.plugins}
      navigateTo={this.navigateTo}
      soundManager={this.context.soundManager}
    /> 
  );

  navigateTo = (passageName, tags) => {
    const {
      passagesMap: { [passageName]: passage },
      store: { dispatch },
    } = this.context;

    assert(
      passage,
      strings.PASSAGE_NOT_FOUND.replace(/%name%/gi, passageName),
    );

    navigate({
      dispatch,
      passage,
      linkTags: tags || [],
    });
  };
};
