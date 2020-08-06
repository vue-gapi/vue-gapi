const { red, logError } = require('./log')

const uppercamelcase = require('uppercamelcase')

exports.write = require('./write')

const { author, name, version } = require('../../package.json')

const authorName = author.replace(/\s+<.*/, '')

exports.author = authorName
exports.version = version
exports.moduleName = uppercamelcase(name)
exports.name = name
exports.banner = `/*!
 * ${name} v${version}
 * (c) ${new Date().getFullYear()} ${authorName}
 * Released under the MIT License.
 */
`

// log.js
exports.red = red
exports.logError = logError
