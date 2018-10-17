function loadGAPIScript (gapiUrl) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script')
    script.src = gapiUrl
    script.onreadystatechange = script.onload = function () {
      var interval = setInterval(function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          clearInterval(interval)
          console.log('gapi.js loaded.')
          resolve()
        }
      }, 100)
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
export const gapiPromise = loadGAPIScript('https://apis.google.com/js/api.js')
