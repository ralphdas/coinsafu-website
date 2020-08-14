import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import livereload from 'rollup-plugin-livereload';
import json from '@rollup/plugin-json';
import command from 'rollup-plugin-command';
import pug from 'rollup-plugin-pug';
// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    !production && livereload(),
    scss({
      watch: ['./src/scss'],
    }),
    pug(),
    resolve({
      jsnext: true,
      preferBuiltins: true,
      browser: true,
    }),
    command('npx pug ./src/templates/ -o ./public/'),
    json(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    production && terser(), // minify, but only in production
  ],
};
