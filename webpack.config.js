const paths = require('./paths');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const createBabelPresets = envSettings => [
  ['@babel/preset-env', envSettings],
  '@babel/preset-react',
  '@babel/preset-typescript'
];
const stats = {
  colors: true,
  reasons: true,
  errorDetails: true,
  env: false,
  builtAt: true,
  assets: true,
  source: false,
  modules: false,
  hash: false,
  publicPath: false,
  version: false,
  entrypoints: false,
  cached: false,
  chunks: false,
  cachedAssets: false,
  chunkModules: false,
  chunkOrigins: false,
  moduleTrace: false,
  children: false
};
const createWebpackSettings = envSettings => ({
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'babel-loader',
        options: {
          presets: createBabelPresets(envSettings)
        }
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.tsx', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: paths.src,
      test: paths.test,
      config: paths.config,
      view: paths.view
    }
  },
  stats
});
const backendPlugins = [];
if (process.env.NODE_ENV === 'development') {
  backendPlugins.append(
    new WebpackShellPlugin({
      onBuildEnd: [
        `echo "Rebuilding backend...\n" && nodemon ${join(
          __dirname,
          'build',
          'backend',
          'main.js'
        )} --quiet --watch ./build/backend`
      ]
    })
  );
}
const backend = {
  name: 'Backend',
  target: 'node',
  entry: join(paths.src, 'backend', 'index.tsx'),
  output: {
    path: join(__dirname, 'build', 'backend'),
    filename: '[name].js'
  },
  plugins: backendPlugins,
  externals: [nodeExternals()],
  ...createWebpackSettings({
    targets: {
      node: 'current'
    }
  })
};
const frontend = {
  name: 'Frontend',
  target: 'web',
  entry: ['@babel/polyfill', join(paths.src, 'frontend', 'index.tsx')],
  output: {
    path: join(__dirname, 'build', 'frontend'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Swagger Platform',
      template: join(paths.public, 'index.html')
    }),
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    https: false,
    open: true,
    overlay: true,
    port: 3000,
    progress: true,
    stats
  },
  ...createWebpackSettings({
    targets: {
      browsers: ['last 2 versions']
    }
  })
};
module.exports = [backend, frontend];
