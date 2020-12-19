export function getObjectCopy(object) {
  return JSON.parse(JSON.stringify(object))
}

export function loadGapiScript() {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onreadystatechange = script.onload = function () {
      const interval = setInterval(function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          clearInterval(interval)
          if (window.gapi) {
            resolve(window.gapi)
          } else {
            reject()
          }
        }
      }, 100)
    }
    script.onerror = function (message, url, line, column, error) {
      reject({ message, url, line, column, error })
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
