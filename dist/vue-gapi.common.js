/*!
 * vue-gapi v0.0.10
 * (c) 2018 CedricPoilly
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function loadGAPIScript (gapiUrl) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = gapiUrl;
    script.onreadystatechange = script.onload = function () {
      var interval = setInterval(function () {
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
  this.refreshToken = this.refreshToken.bind(this);
  this.setSession = this.setSession.bind(this);
  this.logout = this.logout.bind(this);
  this.isAuthenticated = this.isAuthenticated.bind(this);
};

// NOTE: handle expiresAt method, this is private
GoogleAuthService.prototype._expiresAt = function _expiresAt (authResult) {
  return JSON.stringify(authResult.expires_in * 1000 + new Date().getTime())
};

GoogleAuthService.prototype._setStorage = function _setStorage (authResult, profile) {
    if ( profile === void 0 ) profile = null;

  localStorage.setItem('gapi.access_token', authResult.access_token);
  localStorage.setItem('gapi.id_token', authResult.id_token);
  localStorage.setItem('gapi.expires_at', this._expiresAt(authResult));

  if (profile) {
    localStorage.setItem('gapi.id', profile.getId());
    localStorage.setItem('gapi.full_name', profile.getName());
    localStorage.setItem('gapi.first_name', profile.getGivenName());
    localStorage.setItem('gapi.last_name', profile.getFamilyName());
    localStorage.setItem('gapi.image_url', profile.getImageUrl());
    localStorage.setItem('gapi.email', profile.getEmail());
  }
};

GoogleAuthService.prototype._clearStorage = function _clearStorage () {
  localStorage.removeItem('gapi.access_token');
  localStorage.removeItem('gapi.id_token');
  localStorage.removeItem('gapi.expires_at');
  localStorage.removeItem('gapi.id');
  localStorage.removeItem('gapi.full_name');
  localStorage.removeItem('gapi.first_name');
  localStorage.removeItem('gapi.last_name');
  localStorage.removeItem('gapi.image_url');
  localStorage.removeItem('gapi.email');
};

GoogleAuthService.prototype.login = function login (event) {
  return this.authInstance.signIn()
    .then(this.setSession)
};

GoogleAuthService.prototype.refreshToken = function refreshToken (event) {
    var this$1 = this;

  var GoogleUser = this.authInstance.currentUser.get();
  GoogleUser.reloadAuthResponse()
    .then(function (authResult) {
      this$1._setStorage(authResult);
    });
};

GoogleAuthService.prototype.logout = function logout (event) {
  this.authInstance.signOut(function (response) { return console.log(response); });
  this._clearStorage();
  this.authenticated = false;
};

GoogleAuthService.prototype.setSession = function setSession (response) {
  var profile = this.authInstance.currentUser.get().getBasicProfile();
  var authResult = response.Zi;

  this._setStorage(authResult, profile);
  this.authenticated = true;
};

GoogleAuthService.prototype.isAuthenticated = function isAuthenticated () {
  var expiresAt = JSON.parse(localStorage.getItem('gapi.expires_at'));
  return new Date().getTime() < expiresAt
};

GoogleAuthService.prototype.getUserData = function getUserData () {
  return {
    firstName: localStorage.getItem('gapi.first_name'),
    lastName: localStorage.getItem('gapi.last_name'),
    email: localStorage.getItem('gapi.email')
  }
};

var googleAuthService = new GoogleAuthService();
var login = googleAuthService.login;
var logout = googleAuthService.logout;
var isAuthenticated = googleAuthService.isAuthenticated;
var getUserData = googleAuthService.getUserData;
var refreshToken = googleAuthService.refreshToken;

var VueGAPI = {
  install: function (Vue, clientConfig) {
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

    Vue.prototype.$refreshToken = function () {
      return Vue.prototype.$getGapiClient().then(refreshToken)
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

var version = '0.0.10';

exports['default'] = plugin;
exports.version = version;
