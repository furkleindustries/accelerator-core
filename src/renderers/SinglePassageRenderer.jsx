import {
  assertValid,
} from 'ts-assertions';

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
      strings.PASSAGE_NOT_FOUND,
    );

    navigate({
      dispatch,
      passage,
      linkTags: tags || [],
    });
  };
};
