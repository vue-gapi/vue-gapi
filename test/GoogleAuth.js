/**
 * A test helper for GoogleUser
 *
 * @class GoogleUser
 */

export class GoogleUser {
  constructor() {
    this._grantedScopes = ''
    this._rejectGrant = false
    this._isSignedIn = false
  }

  get() {
    return this
  }

  isSignedIn() {
    return this._isSignedIn
  }

  /**
   *
   *
   * @param {boolean} signedIn
   * @memberof GoogleUser
   */
  setIsSignedIn(signedIn) {
    this._isSignedIn = signedIn
  }

  getGrantedScopes() {
    return this._grantedScopes
  }

  setGrantedScopes(scopes) {
    this._grantedScopes = scopes
  }

  hasGrantedScopes(scopes) {
    return scopes == this._grantedScopes
  }

  rejectGrant(rejectMsg) {
    this._rejectGrant = rejectMsg
  }

  resolveGrant() {
    this._rejectGrant = null
  }

  async grant(options) {
    const { scope } = options
    if (this._rejectGrant) {
      // Simulate grant rejection.
      const error = {
        error: this._rejectGrant,
      }
      throw Error(error)
    }
    this.setGrantedScopes(scope)
    return this.get()
  }
}

/**
 * A test helper for GoogleAuth
 *
 * @class GoogleAuth
 */
export class GoogleAuth {
  constructor() {
    this.currentUser = new GoogleUser()
  }
}
