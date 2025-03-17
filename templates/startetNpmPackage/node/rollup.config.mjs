import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { glob } from 'glob';
import typescript from 'rollup-plugin-typescript2';

const files = glob.sync('src/**/*.ts', { nodir: true });

export default {
  input: files,
  output: {
    format: 'esm',
    dir: 'dist',
    preserveModules: true,
  },
  plugins: [
    json(),
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ],
};
