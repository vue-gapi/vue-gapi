/*!
 * vue-gapi v0.1.0
 * (c) 2019 CedricPoilly
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
  this.isSignedIn = this.isSignedIn.bind(this);
};

/**
 * Private method that takes in an authResult and returns when the authResult expires
 *
 * @name _expiresAt
 *
 * @since 0.0.10
 *
 * @access Private
 *
 * @param { object } authResult
 * authResult object from google
 *
 * @returns
 * a string of when the google auth token expires
 */

GoogleAuthService.prototype._expiresAt = function _expiresAt (authResult) {
  return JSON.stringify(authResult.expires_in * 1000 + new Date().getTime())
};

/**
 *Private method that takes in an authResult and a user Profile setting the values in locaStroage
 *
 * @name _setStorage
 *
 * @since 0.0.10
 *
 * @access Private
 *
 * @param { object } authResult
 *authResult object from google
 * @param { object } profile
 *Default is null and if not passed it will be null this is the google user profile object
 *
 * @fires localStorage.setItem
 *
 */

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

/**
 *Private method used to remove all gapi named spaced item from localStorage
 *
 * @name _clearStorage
 *
 * @since 0.0.10
 *
 * @access Private
 *
 * @fires localStorage.removeItem
 *
 */

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

/**
 * Login method takes in the gapi event and sets the sessions
 *
 * @name login
 *
 * @since 0.0.10
 *
 * @see setSession
 *
 * @param { object } event
 *This might not be needed and in the future could be removed
 *
 * @fires this.setSession
 *
 */

GoogleAuthService.prototype.login = function login (event) {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var this$1=this;
  return new Promise ( function (res,rej) {
    this$1.authInstance.signIn()
      .then( function () {
        this$1.setSession;
        res();
      });
  })
};

/**
 * refreshToken method takes in the gapi event and allows calling of a refreshtoken
 *
 * @name refreshToken
 *
 * @since 0.0.10
 *
 * @see _setStorage
 *Private method that takes in the authResult object
 * @see setSession
 *Repies on an authInstance to be set by the setSession
 * @param { object } event
 *NOTE: This might not be needed and could be removed in the future.
 *
 * @fires _setStorage
 *
 */

GoogleAuthService.prototype.refreshToken = function refreshToken (event) {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var this$1 = this;
  var GoogleUser = this.authInstance.currentUser.get();
  GoogleUser.reloadAuthResponse()
    .then(function (authResult) {
      this$1._setStorage(authResult);
    });
};

/**
 * Logout the google user and clear all access and localStroage
 *
 * @name logout
 *
 * @since 0.0.10
 *
 * @param { object } event
 *
 * @fires _clearStorage
 * @fires authInstance.signOut
 * @fires authenticated = false
 *
 */

GoogleAuthService.prototype.logout = function logout (event) {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var this$1=this;
  return new Promise ( function (res,rej) {
    this$1.authInstance.signOut()
      .then( function () {
        this$1._clearStorage();
        this$1.authenticated = false;
        res();
      });
  })
};

/**
 * Set the session of the gapi user
 *
 * @name setSession
 *
 * @since 0.0.10
 *
 * @param { object } response
 *
 * @fires _setStorage
 * @fires authenticated = true
 *
 */

GoogleAuthService.prototype.setSession = function setSession (response) {
  var profile = this.authInstance.currentUser.get().getBasicProfile();
  var authResult = response.Zi;
  this._setStorage(authResult, profile);
  this.authenticated = true;
};

/**
 * Will determine if the login token is valid using localStorage
 *
 * @name isAuthenticated
 *
 * @since 0.0.10
 *
 * @return Boolean
 *
 */

GoogleAuthService.prototype.isAuthenticated = function isAuthenticated () {
  var expiresAt = JSON.parse(localStorage.getItem('gapi.expires_at'));
  return new Date().getTime() < expiresAt
};

/**
 * Will determine if the login token is valid using google methods
 *
 * @name isSignedIn
 *
 * @since 0.0.10
 *
 * @return Boolean
 *
 */

GoogleAuthService.prototype.isSignedIn = function isSignedIn () {
  var GoogleUser = this.authInstance.currentUser.get();
  return GoogleUser.isSignedIn()
};

/**
 * Gets the user data from local storage
 *
 * @name getUserData
 *
 * @since 0.0.10
 *
 * @return object with user data from localStorage
 */

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
var isSignedIn = googleAuthService.isSignedIn;

var VueGAPI = {
  install: function (Vue, clientConfig) {
    Vue.gapiLoadClientPromise = null;

    var resolveAuth2Client = function (resolve, reject) {
      gapiPromise.then(function (_) {
        var gapi = window.gapi;
        if (!gapi) {
          console.error('Failed to load gapi!');
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
              })
              .catch(function (err) {
                if (err.error) {
                  var error = err.error;
                  console.error(
                    'Failed to initialize gapi: %s (status=%s, code=%s)', error.message, error.status, error.code, err);
                }
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
        ) { // MAU DEBUGGARE PER SICUREZZA
          // promise is being executed
          resolve(Vue.gapiLoadClientPromise);
        } else {
          resolveAuth2Client(resolve, reject);
        }
      })
    };

    Vue.prototype.$login = function () {
      Vue.prototype.$getGapiClient()
        .then( function () {
          login()
            .then(function () {
              res();
            });
        });
    };

    Vue.prototype.$refreshToken = function () {
      return Vue.prototype.$getGapiClient().then(refreshToken)
    };

    Vue.prototype.$logout = function () {
      Vue.prototype.$getGapiClient()
        .then( function () {
          logout()
            .then( function () {
              res();
            });
        });
    };

    Vue.prototype.$isAuthenticated = isAuthenticated;

    Vue.prototype.$isSignedIn = isSignedIn;

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

var version = '0.1.0';

exports['default'] = plugin;
exports.version = version;
