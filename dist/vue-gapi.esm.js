/*!
 * vue-gapi v0.0.8
 * (c) 2018 CedricPoilly
 * Released under the MIT License.
 */

function loadGAPIScript(gapiUrl) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.src = gapiUrl;
    script.onreadystatechange = script.onload = function() {
      var interval = setInterval(function() {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          clearInterval(interval);
          console.log('gapi.js loaded.');
          resolve();
        }
      }, 100);
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  })
}
var gapiPromise = loadGAPIScript('https://apis.google.com/js/api.js');

var GoogleAuthService = function GoogleAuthService () {
  this.authenticated = this.isAuthenticated();
  this.authInstance = null;

  this.login = this.login.bind(this);
  this.setSession = this.setSession.bind(this);
  this.logout = this.logout.bind(this);
  this.isAuthenticated = this.isAuthenticated.bind(this);
};

GoogleAuthService.prototype.login = function login (event) {
  return this.authInstance.signIn()
    .then(this.setSession)
};

GoogleAuthService.prototype.logout = function logout (event) {
  this.authInstance.signOut(function (response) { return console.log(response); });
  localStorage.clear();
  this.authenticated = false;
};

GoogleAuthService.prototype.setSession = function setSession (response) {
  var profile = this.authInstance.currentUser.get().getBasicProfile();
  var authResult = response.Zi;
  // Set the time that the access token will expire at
  var expiresAt = JSON.stringify(
    authResult.expires_in * 1000 + new Date().getTime()
  );
  localStorage.setItem('access_token', authResult.access_token);
  localStorage.setItem('id_token', authResult.id_token);
  localStorage.setItem('expires_at', expiresAt);

  this.authenticated = true;

  localStorage.setItem('id', profile.getId());
  localStorage.setItem('full_name', profile.getName());
  localStorage.setItem('first_name', profile.getGivenName());
  localStorage.setItem('last_name', profile.getFamilyName());
  localStorage.setItem('image_url', profile.getImageUrl());
  localStorage.setItem('email', profile.getEmail());
};

GoogleAuthService.prototype.isAuthenticated = function isAuthenticated () {
  var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt
};

GoogleAuthService.prototype.getUserData = function getUserData () {
  return {
    firstName: localStorage.getItem('first_name'),
    lastName: localStorage.getItem('last_name'),
    email: localStorage.getItem('email')
  }
};

var googleAuthService = new GoogleAuthService();
var login = googleAuthService.login;
var logout = googleAuthService.logout;
var isAuthenticated = googleAuthService.isAuthenticated;
var getUserData = googleAuthService.getUserData;

var VueGAPI = {
  install: function(Vue, clientConfig) {
    Vue.gapiLoadClientPromise = null;

    var resolveAuth2Client = function (resolve, reject) {
      gapiPromise.then(function (_) {
        var gapi = window.gapi;
        if (!gapi) {
          console.error('Failed to load GAPI!');
          return
        }
        if (!gapi.auth) {
          gapi.load('client:auth2', function () {
            Vue.gapiLoadClientPromise = gapi.client
              .init(clientConfig)
              .then(function () {
                console.info('gapi client initialised.');
                googleAuthService.authInstance = gapi.auth2.getAuthInstance();
                resolve(gapi);
              });
          });
        } else {
          resolve(gapi);
        }
      });
    };

    Vue.prototype.$getGapiClient = function () {
      return new Promise(function (resolve, reject) {
        if (
          Vue.gapiLoadClientPromise &&
          Vue.gapiLoadClientPromise.status === 0
        ) {
          // promise is being executed
          resolve(Vue.gapiLoadClientPromise);
        } else {
          resolveAuth2Client(resolve, reject);
        }
      })
    };

    Vue.prototype.$login = function () {
      return Vue.prototype.$getGapiClient().then(login)
    };

    Vue.prototype.$logout = function () {
      return Vue.prototype.$getGapiClient().then(logout)
    };

    Vue.prototype.$isAuthenticated = isAuthenticated;

    Vue.prototype.$getUserData = getUserData;
  }
};

function plugin (Vue, clientConfig) {
  Vue.use(VueGAPI, clientConfig);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

var version = '0.0.8';

export { version };export default plugin;
