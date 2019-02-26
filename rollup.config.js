import node from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs'
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import replace from 'rollup-plugin-replace';

const builtins = require('builtins');

module.exports = {
  input: 'index.js',
  external: builtins(),
  output: [
    {
      file: 'bundle.cjs.js',
      format: 'cjs',
      sourcemap: 'inline'
    },
    {
      file: 'bundle.esm.js',
      format: 'esm',
      sourcemap: 'inline'
    }
  ],
  plugins: [
    replace({
      delimiters: ['', ''],
      values: {
        "require('readable-stream/transform')": "require('stream').Transform",
        'require("readable-stream/transform")': "require('stream').Transform",
        "require('readable-stream/duplex')": "require('stream').Duplex",
        'require("readable-stream/duplex")': "require('stream').Duplex",
        "require('readable-stream/writable')": "require('stream').Writable",
        'require("readable-stream/writable")': "require('stream').Writable",
        'readable-stream': 'stream',
        'if(process.argv[1] && process.argv[1].match(__filename))': 'if(false)'
      }
    }),
    json(),
    node({preferBuiltins: true}),
    commonjs(),
    sizeSnapshot()
  ]
};
