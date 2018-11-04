/**
 * @name storageKey
 *
 * @since 0.0.10
 *
 * @param { object } authResult
 * @param { object } profile
 *
 * @returns array of objects that will be used with localStorage to set and remove key value pairs
 *
 */

export const storageKey = (authResult = null, profile = null) => {
  return [
    {
      id: 12345,
      name: 'access_token',
      authKey: authResult.access_token,
      profileKey: null
    },
    {
      id: 12346,
      name: 'id_token',
      authKey: authResult.id_token,
      profileKey: null
    },
    {
      id: 12348,
      name: 'id',
      authKey: null,
      profileKey: profile.getId()
    },
    {
      id: 12349,
      name: 'full_name',
      authKey: null,
      profileKey: profile.getName()
    },
    {
      id: 12349,
      name: 'first_name',
      authKey: null,
      profileKey: profile.getGivenName()
    },
    {
      id: 12350,
      name: 'last_name',
      authKey: null,
      profileKey: profile.getFamilyName()
    },
    {
      id: 12351,
      name: 'image_url',
      authKey: null,
      profileKey: profile.getImageUrl()
    },
    {
      id: 12348,
      name: 'email',
      authKey: null,
      profileKey: profile.getEmail()
    }
  ]
}
