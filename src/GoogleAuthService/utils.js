export function sessionFromCurrentUser(currentUser) {
  const session = sessionFromAuthResponse(currentUser.getAuthResponse(true))
  const profile = currentUser.getBasicProfile()

  if (profile) {
    session.id = profile.getId()
    session.fullName = profile.getName()
    session.firstName = profile.getGivenName()
    session.lastName = profile.getFamilyName()
    session.email = profile.getEmail()
    session.imageUrl = profile.getImageUrl()
  }

  return session
}

export function sessionFromAuthResponse(authResponse) {
  return {
    accessToken: authResponse.access_token,
    idToken: authResponse.id_token,
    expiresAt: expiresAt(authResponse),
  }
}

/**
 * Return the expiration time of the user's auth session.
 *
 * @private
 * @param {object} authResponse gapi.auth2.AuthResponse object
 *
 * @return {number}
 */
export function expiresAt(authResponse) {
  return authResponse.expires_in * 1000 + Date.now()
}
