const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const copy = require('rollup-plugin-copy');
const del = require('rollup-plugin-delete');

const dest = 'build'; // Change this to your output folder

module.exports = {
  input: './src/DailymotionScript.ts', // Change this to your entry file
  output: {
    file: 'build/DailymotionScript.js',
    format: 'cjs', // Use IIFE format to avoid using require
    sourcemap: false
  },
  plugins: [
    del({ targets: `${dest}/*` }), // Clean up the dist folder before building
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    copy({
      targets: [
        { src: './DailymotionConfig.json', dest },
        { src: './assets/dailymotion.png', dest},
        { src: './assets/index.html', dest },
        { src: './assets/qr.PNG', dest},
      ]
    })
  ]
};
