/*!
 * vue-gapi v0.3.1
 * (c) 2020 CedricPoilly
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function loadGAPIScript(gapiUrl) {
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
    script.onerror = function (message, url, line, column, error) {
      console.log('gapi.js not loaded.');
      reject({ message: message, url: url, line: line, column: column, error: error });
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  })
}
var gapiPromise = loadGAPIScript('https://apis.google.com/js/api.js');

function deprecatedMsg(oldInstanceMethod, newInstanceMethod) {
  var msg = "The " + oldInstanceMethod + " Vue instance method is deprecated and will be removed in a future release.";

  if (newInstanceMethod) {
    msg += " Please use " + newInstanceMethod + " instead.";
  }

  return msg
}

function getObjectCopy(object) {
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
function thenArgsFromCallbacks(onResolve, onReject) {
  return [
    function onFulfilled(value) {
      if (typeof onResolve === 'function') {
        onResolve(value);
      }

      return value
    },
    function onRejected(error) {
      if (typeof onReject === 'function') {
        onReject(error);
      }

      return Promise.reject(error)
    } ]
}

/**
 * Singleton class that provides methods to allow the user to sign in with a
 * Google account, get the user's current sign-in status, get specific data
 * from the user's Google profile, request additional scopes, and sign out
 * from the current account.
 *
 * @typedef {object} GoogleAuth
 * @see https://developers.google.com/identity/sign-in/web/reference#authentication
 */

/**
 * Exposed as a <code>$gapi</code> member of the {@link Vue} instance.
 *
 * @package
 * @class GoogleAuthService
 */
var GoogleAuthService = function GoogleAuthService() {
  this.authenticated = this.isAuthenticated();
  /** @type {GoogleAuth} */
  this.authInstance = null;
  this.clientConfig = null;

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
 * @private
 * @method GoogleAuthService#_expiresAt
 * @since 0.0.10
 *
 * @param {object} authResult
 * authResult object from google
 *
 * @returns {string}
 * a string of when the google auth token expires
 */
GoogleAuthService.prototype._expiresAt = function _expiresAt (authResult) {
  return JSON.stringify(authResult.expires_in * 1000 + new Date().getTime())
};

/**
 * Private method that takes in an authResult and a user Profile setting the values in locaStorage
 *
 * @private
 * @method GoogleAuthService#_setStorage
 * @since 0.0.10
 *
 * @param {object} authResult
 *authResult object from google
 * @param {object} profile
 *Default is null and if not passed it will be null this is the google user profile object
 *
 * @fires localStorage.setItem
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
 * Private method used to remove all gapi named spaced item from localStorage
 *
 * @private
 * @method GoogleAuthService#_clearStorage
 * @since 0.0.10
 *
 * @fires localStorage.removeItem
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

GoogleAuthService.prototype._setSession = function _setSession () {
  var profile = this.authInstance.currentUser.get().getBasicProfile();
  var authResult = this.authInstance.currentUser.get().getAuthResponse(true);
  this._setStorage(authResult, profile);
  this.authenticated = true;
};

/**
 * Returns the authorization code set via {@link GoogleAuthService#grantOfflineAccess}.
 *
 * @method GoogleAuthService#getOfflineAccessCode
 * @return {string|null}
 */
GoogleAuthService.prototype.getOfflineAccessCode = function getOfflineAccessCode () {
  return this.offlineAccessCode
};

/**
 * Get permission from the user to access the specified scopes offline.
 *
 * @method GoogleAuthService#grantOfflineAccess
 * @see [GoogleAuth.grantOfflineAccess]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions}
 * @return {Promise}
 */
GoogleAuthService.prototype.grantOfflineAccess = function grantOfflineAccess () {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  return this.authInstance
    .grantOfflineAccess()
    .then(this._setOfflineAccessCode.bind(this))
};

/**
 * Check if requested scopes were granted or not.
 *
 * @method GoogleAuthService#hasGrantedRequestedScopes
 * @return {boolean}
 */
GoogleAuthService.prototype.hasGrantedRequestedScopes = function hasGrantedRequestedScopes () {
  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var ref = this.clientConfig;
    var scope = ref.scope;
  var hasGrantedScopes = true;
  if (scope) {
    var GoogleUser = this.authInstance.currentUser.get();
    hasGrantedScopes = GoogleUser.hasGrantedScopes(scope);
  }
  return hasGrantedScopes
};

/**
 * @typedef LoginResponse
 * @property {bool} hasGrantedScopes True if the requested scopes were granted.
 */

/**
 * Signs in the user.
 *
 * @method GoogleAuthService#login
 * @see [GoogleAuth.signIn]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthsignin}
 *
 * @param {onResolved} [onResolve]
 * @param {onRejected} [onReject]
 *
 * @return {Promise<LoginResponse>}
 *
 * @example
 * <script>
 * export default {
 *   name: 'login-shortcut',
 *
 *   methods: {
 *     login() {
 *       this.$gapi.login().then((resp) => {
 *         console.log( resp.hasGrantedScopes );
 *       })
 *     },
 *   },
 * }
 * </script>
 */
GoogleAuthService.prototype.login = function login (onResolve, onReject) {
    var this$1 = this;
    var ref;

  if (!this.authInstance) { throw new Error('gapi not initialized') }
  return (ref = new Promise(function (res, rej) {
    return this$1.authInstance
      .signIn()
      .then(function () {
        this$1._setSession();
        var ref = this$1.clientConfig;
          var wantsRefreshToken = ref.refreshToken;
        var noOfflineAccess = !wantsRefreshToken;
        if (noOfflineAccess) {
          var hasGrantedScopes = this$1.hasGrantedRequestedScopes();
          return res({ hasGrantedScopes: hasGrantedScopes })
        }

        return this$1.authInstance.grantOfflineAccess()
      })
      .then(function (offlineAccessResponse) {
          if ( offlineAccessResponse === void 0 ) offlineAccessResponse = null;

        var hasGrantedScopes = this.hasGrantedRequestedScopes();
        if (!offlineAccessResponse) {
          return res({ hasGrantedScopes: hasGrantedScopes })
        }

        var code = offlineAccessResponse.code;
        localStorage.setItem('gapi.refresh_token', code);

        res({ hasGrantedScopes: hasGrantedScopes });
      })
      .catch(function (error) {
        console.error(error);
        rej(error);
      })
  })).then.apply(ref, thenArgsFromCallbacks(onResolve, onReject))
};

/**
 * Forces a refresh of the access token.
 *
 * This should be placed in your App.vue on the created page and run on a timer of 45min.
 *
 * @method GoogleAuthService#refreshToken
 * @see [GoogleUser.reloadAuthResponse]{@link https://developers.google.com/identity/sign-in/web/reference#googleuserreloadauthresponse}
 *
 * @return {Promise}
 *
 * @example
 * <script>
 *   name: 'App'
 *
 *   created () {
 *   try {
 *     // NOTE: 45min refresh policy is what google recommends
 *     window.setInterval(this.$gapi.refreshToken(), 2.7e+6)
 *   } catch (e) {
 *     console.error(e)
 *   }
 *
 * }
 * </script>
 */
GoogleAuthService.prototype.refreshToken = function refreshToken () {
    var this$1 = this;

  if (!this.authInstance) { throw new Error('gapi not initialized') }
  var GoogleUser = this.authInstance.currentUser.get();
  return GoogleUser.reloadAuthResponse().then(function (authResult) {
    this$1._setStorage(authResult);
    return authResult
  })
};

/**
 * Ask to grant scopes from user.
 *
 * @method GoogleAuthService#grant
 * @see [GoogleUser.grant]{@link https://developers.google.com/identity/sign-in/web/reference#googleusergrantoptions}
 * @since 0.3.2
 *
 * @param {onResolved} [onResolve]
 * @param {onRejected} [onReject]
 *
 * @return {Promise<GoogleUser>}
 *
 * @example
 * <script>
 * export default {
 *   name: 'grant-scope',
 *
 *   methods: {
 *     grant() {
 *       return this.$gapi.grant()
 *     },
 *   },
 * }
 * </script>
 */
GoogleAuthService.prototype.grant = function grant (onResolve, onReject) {
    var this$1 = this;
    var ref;

  if (!this.authInstance) { throw new Error('gapi not initialized') }
  return (ref = new Promise(function (res, rej) {
    var GoogleUser = this$1.authInstance.currentUser.get();
    var hasGrantedScopes = this$1.hasGrantedRequestedScopes();
    if (hasGrantedScopes) {
      // GoogleUser.grant resolves with GoogleUser object.
      return res(GoogleUser)
    }
    var ref = this$1.clientConfig;
      var scope = ref.scope;
    GoogleUser.grant({ scope: scope }).then(
      function (googleUser) {
        res(googleUser);
      },
      function (error) {
        rej(error);
      }
    );
  })).then.apply(ref, thenArgsFromCallbacks(onResolve, onReject))
};

/**
 * Signs out the current account from the application.
 *
 * @method GoogleAuthService#logout
 * @see [GoogleAuth.signOut]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthsignout}
 *
 * @param {onResolved} [onResolve]
 * @param {onRejected} [onReject]
 *
 * @return {Promise}
 *
 * @example
 * <script>
 * export default {
 *   name: 'logout-shortcut',
 *
 *   methods: {
 *     login() {
 *       this.$gapi.logout()
 *     },
 *   },
 * }
 * </script>
 */
GoogleAuthService.prototype.logout = function logout (onResolve, onReject) {
    var this$1 = this;
    var ref;

  if (!this.authInstance) { throw new Error('gapi not initialized') }
  return (ref = new Promise(function (res, rej) {
    this$1.authInstance.signOut().then(
      function () {
        this$1._clearStorage();
        this$1.authenticated = false;
        res();
      },
      function (error) {
        rej(error);
      }
    );
  })).then.apply(ref, thenArgsFromCallbacks(onResolve, onReject))
};

/**
 * Determines if the user is signed in via local storage.
 *
 * @method GoogleAuthService#isAuthenticated
 * @since 0.0.10
 * @return {boolean}
 *
 * @example
 * <script>
 * export default {
 *   name: 'login-shortcut-check',
 *
 *   methods: {
 *     login() {
 *       if (this.$gapi.isAuthenticated() !== true) {
 *         this.$gapi.login()
 *       }
 *     },
 *   },
 * }
 * </script>
 */
GoogleAuthService.prototype.isAuthenticated = function isAuthenticated () {
  var expiresAt = JSON.parse(localStorage.getItem('gapi.expires_at'));
  return new Date().getTime() < expiresAt
};

/**
 * Determines if the user is signed in via Google. Can be used inside v-if views.
 *
 * @method GoogleAuthService#isSignedIn
 * @see [GoogleUser.isSignedIn]{@link https://developers.google.com/identity/sign-in/web/reference#googleuserissignedin}
 * @since 0.0.10
 * @return {boolean}
 *
 * @example
 * <script>
 * export default {
 *   name: 'is-signed-in',
 *
 *   computed: {
 *     isSignedIn() {
 *       return this.$gapi.isSignedIn()
 *     },
 *   },
 * }
 * </script>
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
 * @method GoogleAuthService#listenUserSignIn
 * @see [GoogleAuth.isSignedIn.listen]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinlistenlistener}
 * @since 0.0.10
 *
 * @param {function} callback
 * the callback function to be notified of an authentication status change
 *
 * @return {boolean|GoogleAuthService#UserData} False if NOT authenticated, UserData if authenticated
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
 * @typedef {object} GoogleAuthService#UserData
 *
 * @see [gapi.auth2.AuthResponse]{@link https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse}
 * @see [GoogleUser.getBasicProfile]{@link https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile}
 *
 * @property {string} id user's unique ID string
 * @property {string} firstName given name
 * @property {string} lastName family name
 * @property {string} fullName full name
 * @property {string} email
 * @property {string} imageUrl
 * @property {string} expiresAt
 * @property {string} accessToken granted access token
 * @property {string} idToken granted ID token
 */

/**
 * Gets the user data from local storage
 *
 * @method GoogleAuthService#getUserData
 * @since 0.0.10
 * @return {GoogleAuthService#UserData}
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
    idToken: localStorage.getItem('gapi.id_token'),
  }
};

var googleAuthService = new GoogleAuthService();
var getOfflineAccessCode = googleAuthService.getOfflineAccessCode;
var getUserData = googleAuthService.getUserData;
var grant = googleAuthService.grant;
var grantOfflineAccess = googleAuthService.grantOfflineAccess;
var isAuthenticated = googleAuthService.isAuthenticated;
var isSignedIn = googleAuthService.isSignedIn;
var listenUserSignIn = googleAuthService.listenUserSignIn;
var login = googleAuthService.login;
var logout = googleAuthService.logout;
var refreshToken = googleAuthService.refreshToken;

/**
 * @class Vue
 */

/** @module vue-gapi */

/**
 * VueGapi plugin options and <code>gapi.auth2.init</code> configuration parameters.
 *
 * @typedef {object} Options
 * @static
 * @see [gapi.client.init]{@link https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--}
 *
 * @property {string} [apiKey] The API Key to use
 * @property {string[]} [discoveryDocs] An array of discovery doc URLs or discovery doc JSON objects
 * @property {string} [clientId] The app's client ID, found and created in the Google Developers Console
 * @property {string} [scope] The scopes to request, as a space-delimited string
 */

var VueGapi = {
  /**
   * @param {Vue} Vue Vue constructor
   * @param {module:vue-gapi.Options} clientConfig VueGapi plugin options
   * @see [Using a Plugin]{@link https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin}
   */
  install: function (Vue, clientConfig) {
    Vue.gapiLoadClientPromise = null;
    googleAuthService.clientConfig = getObjectCopy(clientConfig);

    var resolveAuth2Client = function (resolve, reject) {
      gapiPromise.then(function () {
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
                Vue.gapiLoadClientPromise.status = 0;

                resolve(gapi);
              })
              .catch(function (err) {
                if (err.error) {
                  var error = err.error;
                  console.error(
                    'Failed to initialize gapi: %s (status=%s, code=%s)',
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

    /**
     * @memberof Vue
     * @member {GoogleAuthService}
     *
     * @example
     * <script>
     *   export default {
     *     name: 'my-component',
     *
     *     methods: {
     *       login() {
     *         this.$gapi.getGapiClient().then((gapi) => {
     *           // gapi.sheets.spreadsheet.get(...)
     *           // ...
     *         })
     *       },
     *     },
     *   }
     * </script>
     */
    Vue.prototype.$gapi = {
      /**
       * @memberof GoogleAuthService
       * @method GoogleAuthService#getGapiClient
       * @return {Promise<GoogleAuth>}
       */
      getGapiClient: function () {
        return new Promise(function (resolve, reject) {
          // A promise cannot be executed twice
          // In our case, once the promise has been resolve
          // we know that the `gapi` client is ready.
          if (
            Vue.gapiLoadClientPromise &&
            Vue.gapiLoadClientPromise.status === 0
          ) {
            return resolve(window.gapi)
          } else {
            resolveAuth2Client(resolve, reject);
          }
        })
      },
      getOfflineAccessCode: getOfflineAccessCode,
      grantOfflineAccess: function () {
        return Vue.prototype.$gapi
          .getGapiClient()
          .then(grantOfflineAccess)
          .then(function () {
            googleAuthService.authInstance
              .grantOfflineAccess()
              .then(function (res) {
                console.log(res);
                var refreshToken = res.code;
                localStorage.setItem('gapi.refresh_token', refreshToken);
              })
              .catch(console.error);
          })
      },
      login: function (res, rej) {
        return Vue.prototype.$gapi.getGapiClient().then(function () { return login(res, rej); })
      },
      refreshToken: function () {
        return Vue.prototype.$gapi.getGapiClient().then(refreshToken)
      },
      logout: function (res, rej) {
        return Vue.prototype.$gapi.getGapiClient().then(function () { return logout(res, rej); })
      },
      grant: function (res, rej) {
        return Vue.prototype.$gapi.getGapiClient().then(function () { return grant(res, rej); })
      },
      listenUserSignIn: function (callback) {
        return Vue.prototype.$gapi
          .getGapiClient()
          .then(function () { return listenUserSignIn(callback); })
      },
      isSignedIn: function () {
        return Vue.prototype.$gapi.getGapiClient().then(isSignedIn)
      },
      isAuthenticated: isAuthenticated,
      getUserData: getUserData,
    };

    Vue.prototype.isGapiLoaded = function () {
      console.warn(deprecatedMsg('isGapiLoaded'));
      return Vue.gapiLoadClientPromise && Vue.gapiLoadClientPromise.status === 0
    };

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getGapiClient = function () {
      console.warn(deprecatedMsg('$getGapiClient', '$gapi.getGapiClient'));
      return Vue.prototype.$gapi.getGapiClient()
    };

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$login = function () {
      console.warn(deprecatedMsg('$login', '$gapi.login'));
      return Vue.prototype.$gapi.login()
    };

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$refreshToken = function () {
      console.warn(deprecatedMsg('$refreshToken', '$gapi.refreshToken'));
      return Vue.prototype.$gapi.refreshToken()
    };

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$logout = function () {
      console.warn(deprecatedMsg('$logout', '$gapi.logout'));
      return Vue.prototype.$gapi.logout()
    };

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isAuthenticated = function () {
      console.warn(deprecatedMsg('$isAuthenticated', '$gapi.isAuthenticated'));
      return Vue.prototype.$gapi.isAuthenticated()
    };

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isSignedIn = function () {
      console.warn(deprecatedMsg('$isAuthenticated', '$gapi.isAuthenticated'));
      return Vue.prototype.$gapi.isSignedIn()
    };

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getUserData = function () {
      console.warn(deprecatedMsg('$getUserData', '$gapi.getUserData'));
      return Vue.prototype.$gapi.getUserData()
    };
  },
};

function plugin(Vue, clientConfig) {
  Vue.use(VueGapi, clientConfig);
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
var version = '0.3.1';

exports.default = plugin;
exports.version = version;
