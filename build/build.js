const mkdirp = require('mkdirp')
const rollup = require('rollup').rollup
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const uglify = require('uglify-js')

// Make sure dist dir exists
mkdirp('dist')

const {
  logError,
  write,
  banner,
  name,
  moduleName,
  version,
} = require('./utils')

function rollupBundle({ env }) {
  return rollup({
    entry: 'src/index.js',
    moduleContext: {
      [require.resolve('whatwg-fetch')]: 'window',
    },
    plugins: [
      node({
        extensions: ['.js'],
      }),
      cjs(),
      replace(
        Object.assign(
          {
            __VERSION__: version,
          },
          env
        )
      ),
      buble({
        objectAssign: 'Object.assign',
      }),
    ],
  })
}

const bundleOptions = {
  banner,
  exports: 'named',
  format: 'umd',
  moduleName,
}

function createBundle({ name, env, format }) {
  return rollupBundle({ env })
    .then(function (bundle) {
      const options = Object.assign({}, bundleOptions)
      if (format) options.format = format
      const code = bundle.generate(options).code
      if (/min$/.test(name)) {
        const minified = uglify.minify(code, {
          output: {
            preamble: banner,
            ascii_only: true, // eslint-disable-line camelcase
          },
        }).code
        return write(`dist/${name}.js`, minified)
      } else {
        return write(`dist/${name}.js`, code)
      }
    })
    .catch(logError)
}

// Browser bundle (can be used with script)
createBundle({
  name,
  env: {
    'process.env.NODE_ENV': '"development"',
  },
})

// Commonjs bundle (preserves process.env.NODE_ENV) so
// the user can replace it in dev and prod mode
createBundle({
  name: `${name}.common`,
  env: {},
  format: 'cjs',
})

// uses export and import syntax. Should be used with modern bundlers
// like rollup and webpack 2
createBundle({
  name: `${name}.esm`,
  env: {},
  format: 'es',
})

// Minified version for browser
createBundle({
  name: `${name}.min`,
  env: {
    'process.env.NODE_ENV': '"production"',
  },
})
