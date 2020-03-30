import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import gzipPlugin from 'rollup-plugin-gzip';
import { compress } from 'brotli';
import pckg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    globals: {
      react: 'React',
    },
    format: 'umd',
    name: 'ReactHotKey',
    sourcemap: true,
    banner: [
      `/**`,
      ` * ${pckg.name} ${pckg.version}`,
      ` * ${pckg.description}`,
      ` * ${pckg.homepage}`,
      ` * (c) ${pckg.author}, under the ${pckg.license} license`,
      ` */`,
    ].join('\n'),
    compact: true,
  },
  plugins: [
    typescript(),
    resolve({ resolveOnly: ['mousetrap'] }),
    commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    ...(isProduction
      ? [
          terser(),
          gzipPlugin({
            customCompression: (content) => compress(Buffer.from(content)),
            fileName: '.br',
          }),
        ]
      : []),
  ],
};
