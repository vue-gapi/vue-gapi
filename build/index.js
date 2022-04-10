const fs = require('fs')
const rollup = require('rollup').rollup
const buble = require('@rollup/plugin-buble')
const replace = require('@rollup/plugin-replace')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const uglify = require('uglify-js')
const { write, banner, name, moduleName, version } = require('./utils')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

function rollupBundle() {
  return rollup({
    external: 'vue',
    input: 'src/index.js',
    plugins: [
      nodeResolve(),
      commonjs(),
      replace({
        preventAssignment: true,
        values: {
          __VERSION__: version,
        },
      }),
      buble({
        objectAssign: 'Object.assign',
        transforms: {
          forOf: false,
        },
      }),
    ],
  })
}

const bundleOptions = {
  banner,
  exports: 'named',
  format: 'umd',
  name: moduleName,
  globals: {
    vue: 'Vue',
  },
}

/**
 * @param {String} name
 * @param {String} [format='umd']
 * @return {Promise<unknown>}
 */
async function createBundle(name, format) {
  const bundle = await rollupBundle()
  const options = { ...bundleOptions }

  if (format) {
    options.format = format
  }

  const { output } = await bundle.generate(options)
  const code = output[0].code

  if (/min$/.test(name)) {
    const minified = uglify.minify(code, {
      output: {
        preamble: banner,
        ascii_only: true, // eslint-disable-line camelcase
      },
    })

    if (minified.error) {
      throw new Error(minified.error)
    }

    return write(`dist/${name}.js`, minified.code)
  }

  return write(`dist/${name}.js`, code)
}

function main() {
  return Promise.all([
    // Browser bundle (can be used with script)
    createBundle(name),

    // Commonjs bundle (preserves process.env.NODE_ENV) so
    // the user can replace it in dev and prod mode
    createBundle(`${name}.common`, 'cjs'),

    // uses export and import syntax. Should be used with modern bundlers
    // like rollup and webpack 2
    createBundle(`${name}.esm`, 'es'),

    // Minified version for browser
    createBundle(`${name}.min`),
  ])
}

main().catch((error) => {
  console.error(error.message)

  process.exit(1)
})
