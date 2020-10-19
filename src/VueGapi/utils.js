export function deprecatedMsg(oldInstanceMethod, newInstanceMethod) {
  let msg = `The ${oldInstanceMethod} Vue instance method is deprecated and will be removed in a future release.`

  if (newInstanceMethod) {
    msg += ` Please use ${newInstanceMethod} instead.`
  }

  return msg
}

export function getObjectCopy(object) {
  return JSON.parse(JSON.stringify(object))
}

/**
 * A Function called if the Promise is fulfilled.
 *
 * @callback onResolved
 * @param {*} value
 */

/**
 * A Function called if the Promise is rejected.
 *
 * @callback onRejected
 * @param {*} error
 */

/**
 * Creates Promise.then() handlers for the optional callbacks.
 *
 * @private
 *
 * @param {onResolved} [onResolve]
 * @param {onRejected} [onReject]
 *
 * @return {function[]}
 */
export function thenArgsFromCallbacks(onResolve, onReject) {
  return [
    function onFulfilled(value) {
      if (typeof onResolve === 'function') {
        onResolve(value)
      }

      return value
    },
    function onRejected(error) {
      if (typeof onReject === 'function') {
        onReject(error)
      }

      return Promise.reject(error)
    },
  ]
}
