import tsPlugin from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
  input: 'src/export.ts',
  output: {
    name: 'stair',
    file: 'examples/stair.esm.js',
    format: 'umd',
    exports: 'named',
  },
  plugins: [
    nodeResolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    }),
    tsPlugin(),
    css(),
    image(),
    url({
      fileName: '[name][extname]',
      include: ['**/*.obj'],
      limit: 100000,
    }),
    json(),
  ],
};
