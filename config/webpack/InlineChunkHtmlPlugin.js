export default class InlineChunkHtmlPlugin {
  constructor(htmlWebpackPlugin, tests) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.tests = tests;
  }

  getInlinedTag = (publicPath, assets, tag) => {
    if (tag.tagName !== 'script' || !tag.attributes || !tag.attributes.src) {
      return tag;
    }

    const scriptName = publicPath ?
      tag.attributes.src.replace(publicPath, '') :
      tag.attributes.src;

    const { [scriptName]: asset } = assets;
  
    const hasMatches = this.tests.some((re) => re.test(scriptName));

    if (!asset || !hasMatches) {
      return {
        ...tag,

        attributes: {
          ...tag.attributes,
          defer: 'defer',
        },
      };
    }

    return {
      tagName: 'script',
      innerHTML: asset.source(),
      closeTag: true,
    };
  }

  apply = (compiler) => {
    let publicPath = (compiler.options.output.publicPath || '').trim();
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }

    compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', (compilation) => {
      const tagFunction = (tag) => (
        this.getInlinedTag(publicPath, compilation.assets, tag)
      );

      const { alterAssetTagGroups } = this.htmlWebpackPlugin.getHooks(
        compilation,
      );

      alterAssetTagGroups.tap('InlineChunkHtmlPlugin', (assets) => {
        Object.assign(assets, {
          headTags: assets.headTags.map(tagFunction),
          bodyTags: assets.bodyTags.map(tagFunction),
        });
      });
    });
  }
}
