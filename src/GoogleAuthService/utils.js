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
    expiresAt: authResponse.expires_at,
  }
}
