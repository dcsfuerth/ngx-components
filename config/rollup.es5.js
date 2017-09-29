const replaceTsDefaultImports = require('@dcs/ngx-build-tools')
  .replaceTypescriptDefaultImportsPlugin;
const absModuleFix = require('rollup-plugin-absolute-module-fix');
const sourcemaps = require('rollup-plugin-sourcemaps');

const pkg = require('../package.json');

const external = [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)];

export default {
  input: 'tmp/es5/index.js',
  output: [
    {
      file: 'build/esm5/index.js',
      format: 'es',
      name: 'ngx-utils',
      sourcemap: true,
    },
    {
      file: 'build/bundles/ngx-components.umd.js',
      format: 'umd',
      name: 'ngxLibStarter',
      sourcemap: true,
    },
  ],
  external,
  plugins: [sourcemaps(), absModuleFix(), replaceTsDefaultImports()],
};
