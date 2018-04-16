const { join } = require('path');
const root = __dirname;
const src = join(root, 'src');
const view = join(src, 'view');
const model = join(src, 'model');
const styles = join(src, 'styles');
const state = join(src, 'state');
const client = join(src, 'client');
const backend = join(src, 'backend');
const frontend = join(src, 'frontend');
const build = join(root, 'build');
const buildBackend = join(build, 'backend');
module.exports = {
  src,
  view,
  model,
  styles,
  state,
  client,
  backend,
  frontend,
  buildBackend,
  test: join(root, 'test'),
  build: join(root, 'build'),
  public: join(root, 'public'),
  config: join(root, 'config')
};
