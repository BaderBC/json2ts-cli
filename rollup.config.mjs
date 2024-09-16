import {nodeResolve} from '@rollup/plugin-node-resolve';
import shebang from 'rollup-plugin-add-shebang';
import commonjs from "@rollup/plugin-commonjs";
import {terser} from 'rollup-plugin-terser';

/** @type {import('rollup').RollupOptions} */
export default {
    input: 'index.js',
    output: {
        file: 'bin/index.js',
        format: 'cjs',
    },
    external: 'fs',
    plugins: [
        nodeResolve(),
        commonjs(),
        shebang(),
        terser(),
    ]
};
