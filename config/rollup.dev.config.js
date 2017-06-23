const angular = require('rollup-plugin-angular');
const tsPlugin = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replaceTsDefaultImports = require('@dcs/ngx-build-tools')
  .replaceTypescriptDefaultImportsPlugin;

const sass = require('node-sass');
const postcss = require('postcss');

const postcssConfig = require('./postcss.config');
const pkg = require('../package.json');
const external = [...Object.keys(pkg.peerDependencies || {}), 'os'];

const plugins = [
  replaceTsDefaultImports(),
  resolve(),
  commonjs(),
  angular({
    preprocessors: {
      style: scss => {
        const css = sass.renderSync({ data: scss }).css;
        return postcss(postcssConfig).process(css).css;
      },
    },
  }),
  tsPlugin({
    typescript: require('typescript'),
    tsconfig: 'tsconfig.json',
  }),
];

module.exports = {
  entry: './index.ts',
  dest: './build/@dcs/ngx-utils/ngx-utils.es5.js',
  format: 'es',
  sourceMap: true,
  plugins: plugins,
  external: external,
};
