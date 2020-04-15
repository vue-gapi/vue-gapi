/*!
 * vue-gapi v0.1.2
 * (c) 2020 CedricPoilly
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueGapi = global.VueGapi || {})));
}(this, (function (exports) { 'use strict';

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

  this.offlineAccessCode = null;
  this.getOfflineAccessCode = this.getOfflineAccessCode.bind(this);
  this.grantOfflineAccess = this.grantOfflineAccess.bind(this);
  this.login = this.login.bind(this);
  this.refreshToken = this.refreshToken.bind(this);
  this.logout = this.logout.bind(this);
  this.isAuthenticated = this.isAuthenticated.bind(this);
  this.isSignedIn = this.isSignedIn.bind(this);
  this.listenUserSignIn = this.listenUserSignIn.bind(this);
};

/**
 * Private method that takes in an authResult and returns the authResult expiration time
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
 *Private method that takes in an authResult and a user Profile setting the values in locaStorage
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

GoogleAuthService.prototype._setOfflineAccessCode = function _setOfflineAccessCode (authResult) {
  if (authResult.code) {
    this.offlineAccessCode = authResult.code;
  } else {
    throw new Error('Offline access code missing from result', authResult)
  }
};

GoogleAuthService.prototype._setSession = function _setSession (response) {
  var profile = this.authInstance.currentUser.get().getBasicProfile();
  var authResult = this.authInstance.currentUser.get().getAuthResponse(true);
  this._setStorage(authResult, profile);
  this.authenticated = true;
};

GoogleAuthService.prototype.getOfflineAccessCode = function getOfflineAccessCode () {
  return this.offlineAccessCode
};

GoogleAuthService.prototype.grantOfflineAccess = function grantOfflineAccess (event) {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  return this.authInstance.grantOfflineAccess()
    .then(this._setOfflineAccessCode.bind(this))
};

GoogleAuthService.prototype.login = function login (event) {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var this$1 = this;
  return new Promise(function (res, rej) {
    this$1.authInstance.signIn()
      .then(function (response) {
        this$1._setSession(response);
        res();
      });
  })
};

GoogleAuthService.prototype.refreshToken = function refreshToken (event) {
    var this$1 = this;

  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var GoogleUser = this.authInstance.currentUser.get();
  GoogleUser.reloadAuthResponse()
    .then(function (authResult) {
      this$1._setStorage(authResult);
    });
};

GoogleAuthService.prototype.logout = function logout (event) {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var this$1 = this;
  return new Promise(function (res, rej) {
    this$1.authInstance.signOut()
      .then(function () {
        this$1._clearStorage();
        this$1.authenticated = false;
        res();
      });
  })
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
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var GoogleUser = this.authInstance.currentUser.get();
  return GoogleUser.isSignedIn()
};

/**
 * Accept the callback to be notified when the authentication status changes.
 * Will also determine if the login token is valid using google methods and return UserData or false
 *
 * @name listenUserSignIn
 *
 * @since 0.0.10
 *
 * @param { function } Callback
 * the callback function to be notified of an authentication status change
 * @return Boolean. False if NOT authenticated, UserData if authenticated
 *
 */
GoogleAuthService.prototype.listenUserSignIn = function listenUserSignIn (callback) {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  this.authInstance.isSignedIn.listen(callback);
  if (this.authInstance.currentUser.get().isSignedIn()) {
    return this.getUserData()
  } else {
    return false
  }
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
    id: localStorage.getItem('gapi.id'),
    firstName: localStorage.getItem('gapi.first_name'),
    lastName: localStorage.getItem('gapi.last_name'),
    fullName: localStorage.getItem('gapi.full_name'),
    email: localStorage.getItem('gapi.email'),
    imageUrl: localStorage.getItem('gapi.image_url'),
    expiresAt: localStorage.getItem('gapi.expires_at'),
    accessToken: localStorage.getItem('gapi.access_token'),
    idToken: localStorage.getItem('gapi.id_token')
  }
};

var googleAuthService = new GoogleAuthService();
var grantOfflineAccess = googleAuthService.grantOfflineAccess;
var getOfflineAccessCode = googleAuthService.getOfflineAccessCode;
var login = googleAuthService.login;
var logout = googleAuthService.logout;
var isAuthenticated = googleAuthService.isAuthenticated;
var getUserData = googleAuthService.getUserData;
var refreshToken = googleAuthService.refreshToken;
var isSignedIn = googleAuthService.isSignedIn;
var listenUserSignIn = googleAuthService.listenUserSignIn;

var VueGapi = {
  install: function (Vue, clientConfig) {
    Vue.gapiLoadClientPromise = null;

    var resolveAuth2Client = function (resolve, reject) {
      gapiPromise.then(function (_) {
        var gapi = window.gapi;
        if (!gapi) {
          console.error("Failed to load gapi!");
          return;
        }
        if (!gapi.auth) {
          gapi.load("client:auth2", function () {
            Vue.gapiLoadClientPromise = gapi.client
              .init(clientConfig)
              .then(function () {
                console.info("gapi client initialised.");
                googleAuthService.authInstance = gapi.auth2.getAuthInstance();
                Vue.gapiLoadClientPromise.status = 0;

                googleAuthService.authInstance
                  .grantOfflineAccess()
                  .then(function (res) {
                    console.log(res);
                    var refreshToken = res.code;
                    localStorage.setItem("gapi.refresh_token", refreshToken);
                    debugger;
                  })
                  .catch(console.error)
                  .finally(resolve(gapi));
              })
              .catch(function (err) {
                if (err.error) {
                  var error = err.error;
                  console.error(
                    "Failed to initialize gapi: %s (status=%s, code=%s)",
                    error.message,
                    error.status,
                    error.code,
                    err
                  );
                }
                reject(err);
              });
          });
        } else {
          resolve(gapi);
        }
      });
    };

    Vue.prototype.$gapi = {
      getGapiClient: function () {
        return new Promise(function (resolve, reject) {
          // A promise cannot be executed twice
          // In our case, once the promise has been resolve
          // we know that the `gapi` client is ready.
          if (
            Vue.gapiLoadClientPromise &&
            Vue.gapiLoadClientPromise.status === 0
          ) {
            return resolve(window.gapi);
          } else {
            resolveAuth2Client(resolve, reject);
          }
        });
      },
      getOfflineAccessCode: getOfflineAccessCode,
      grantOfflineAccess: function () {
        return Vue.prototype.$gapi.getGapiClient().then(grantOfflineAccess);
      },
      login: function (res) {
        return Vue.prototype.$gapi.getGapiClient().then(function () {
          login().then(function () {
            if (typeof res === "function") {
              res();
            }
          });
        });
      },
      refreshToken: function () {
        return Vue.prototype.$gapi.getGapiClient().then(refreshToken);
      },
      logout: function (res) {
        return Vue.prototype.$gapi.getGapiClient().then(function () {
          logout().then(function () {
            if (typeof res === "function") {
              res();
            }
          });
        });
      },
      listenUserSignIn: function (callback) {
        return Vue.prototype.$gapi.getGapiClient().then(function () {
          return listenUserSignIn(callback);
        });
      },

      isSignedIn: function () {
        return Vue.prototype.$gapi.getGapiClient().then(isSignedIn);
      },
      isAuthenticated: isAuthenticated,
      getUserData: getUserData,
    };

    Vue.prototype.isGapiLoaded = function () {
      return (
        Vue.gapiLoadClientPromise && Vue.gapiLoadClientPromise.status === 0
      );
    };

    var deprectedMsg = function (oldInstanceMethod, newInstanceMethod) { return ("The " + oldInstanceMethod + " Vue instance method is deprecated and will be removed in a future release. Please use " + newInstanceMethod + " instead."); };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getGapiClient = function () {
      console.warn(deprectedMsg("$getGapiClient", "$gapi.getGapiClient"));
      return Vue.prototype.$gapi.getGapiClient();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$login = function () {
      console.warn(deprectedMsg("$login", "$gapi.login"));
      return Vue.prototype.$gapi.login();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$refreshToken = function () {
      console.warn(deprectedMsg("$refreshToken", "$gapi.refreshToken"));
      return Vue.prototype.$gapi.refreshToken();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$logout = function () {
      console.warn(deprectedMsg("$logout", "$gapi.logout"));
      return Vue.prototype.$gapi.logout();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isAuthenticated = function () {
      console.warn(deprectedMsg("$isAuthenticated", "$gapi.isAuthenticated"));
      return Vue.prototype.$gapi.isAuthenticated();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isSignedIn = function () {
      console.warn(deprectedMsg("$isAuthenticated", "$gapi.isAuthenticated"));
      return Vue.prototype.$gapi.isSignedIn();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getUserData = function () {
      console.warn(deprectedMsg("$getUserData", "$gapi.getUserData"));
      return Vue.prototype.$gapi.getUserData();
    };
  },
};

function plugin(Vue, clientConfig) {
  Vue.use(VueGapi, clientConfig);
}

// Install by default if using the script tag
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}

var version = "0.1.2";

exports['default'] = plugin;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
