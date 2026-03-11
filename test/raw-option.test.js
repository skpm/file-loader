import path from 'path';

import { compile, getCompiler } from './helpers';

describe('"raw" option', () => {
  it('should avoid stringifying values returned from publicPath() and outputPath() if set', async () => {
    const compiler = getCompiler('simple.js', {
      raw: true,
      esModule: false,
      test: /(png|jpg|svg)/,
      outputPath: (url) =>
        path.join('..', 'Resources', '_webpack_resources', url),
      publicPath: (url) =>
        `"file://" + context.plugin.urlForResourceNamed("_webpack_resources/${url}").path()`,
    });
    const stats = await compile(compiler);
    const [{ assets, source }] = stats.toJson().modules;

    expect({ assets, source }).toMatchSnapshot('module');
  });
});
