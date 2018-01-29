import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/webvipolyfill.js',
  output: {
    file: 'dist/webvipolyfill.dist.js',
    format: 'umd',
    name: 'webvipolyfill',
    exports: 'default'
  },
  plugins: [
    resolve({
      preferBuiltins: false // Needed for the url node_module to be used instead of Node's url module
    }),
    commonjs()
  ]
};
