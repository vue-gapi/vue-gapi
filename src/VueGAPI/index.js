import { gapiPromise } from "./gapi";
import GoogleAuthService from "./GoogleAuthService";

const googleAuthService = new GoogleAuthService();
const {
  grantOfflineAccess,
  getOfflineAccessCode,
  login,
  logout,
  isAuthenticated,
  getUserData,
  refreshToken,
  isSignedIn,
  listenUserSignIn,
} = googleAuthService;

export default {
  install: function (Vue, clientConfig) {
    Vue.gapiLoadClientPromise = null;

    const resolveAuth2Client = (resolve, reject) => {
      gapiPromise.then((_) => {
        const gapi = window.gapi;
        if (!gapi) {
          console.error("Failed to load gapi!");
          return;
        }
        if (!gapi.auth) {
          gapi.load("client:auth2", () => {
            Vue.gapiLoadClientPromise = gapi.client
              .init(clientConfig)
              .then(() => {
                console.info("gapi client initialised.");
                googleAuthService.authInstance = gapi.auth2.getAuthInstance();
                Vue.gapiLoadClientPromise.status = 0;

                resolve(gapi);
              })
              .catch((err) => {
                if (err.error) {
                  const error = err.error;
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
      getGapiClient: () => {
        return new Promise((resolve, reject) => {
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
      getOfflineAccessCode,
      grantOfflineAccess: () => {
        return Vue.prototype.$gapi
          .getGapiClient()
          .then(grantOfflineAccess)
          .then(() => {
            googleAuthService.authInstance
              .grantOfflineAccess()
              .then((res) => {
                console.log(res);
                const refreshToken = res.code;
                localStorage.setItem("gapi.refresh_token", refreshToken);
              })
              .catch(console.error);
          });
      },
      login: (res) => {
        return Vue.prototype.$gapi.getGapiClient().then(() => {
          login().then(() => {
            if (typeof res === "function") {
              res();
            }
          });
        });
      },
      refreshToken: () => {
        return Vue.prototype.$gapi.getGapiClient().then(refreshToken);
      },
      logout: (res) => {
        return Vue.prototype.$gapi.getGapiClient().then(() => {
          logout().then(() => {
            if (typeof res === "function") {
              res();
            }
          });
        });
      },
      listenUserSignIn: (callback) => {
        return Vue.prototype.$gapi.getGapiClient().then(() => {
          return listenUserSignIn(callback);
        });
      },

      isSignedIn: () => {
        return Vue.prototype.$gapi.getGapiClient().then(isSignedIn);
      },
      isAuthenticated,
      getUserData,
    };

    Vue.prototype.isGapiLoaded = () => {
      return (
        Vue.gapiLoadClientPromise && Vue.gapiLoadClientPromise.status === 0
      );
    };

    const deprectedMsg = (oldInstanceMethod, newInstanceMethod) =>
      `The ${oldInstanceMethod} Vue instance method is deprecated and will be removed in a future release. Please use ${newInstanceMethod} instead.`;

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getGapiClient = () => {
      console.warn(deprectedMsg("$getGapiClient", "$gapi.getGapiClient"));
      return Vue.prototype.$gapi.getGapiClient();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$login = () => {
      console.warn(deprectedMsg("$login", "$gapi.login"));
      return Vue.prototype.$gapi.login();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$refreshToken = () => {
      console.warn(deprectedMsg("$refreshToken", "$gapi.refreshToken"));
      return Vue.prototype.$gapi.refreshToken();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$logout = () => {
      console.warn(deprectedMsg("$logout", "$gapi.logout"));
      return Vue.prototype.$gapi.logout();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isAuthenticated = () => {
      console.warn(deprectedMsg("$isAuthenticated", "$gapi.isAuthenticated"));
      return Vue.prototype.$gapi.isAuthenticated();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isSignedIn = () => {
      console.warn(deprectedMsg("$isAuthenticated", "$gapi.isAuthenticated"));
      return Vue.prototype.$gapi.isSignedIn();
    };

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getUserData = () => {
      console.warn(deprectedMsg("$getUserData", "$gapi.getUserData"));
      return Vue.prototype.$gapi.getUserData();
    };
  },
};
