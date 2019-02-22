/* eslint-env node, jest */
import AuthService from '../src/VueGAPI/GoogleAuthService'
import { mockAuthResult } from './mockAuthResult'
import LocalStorage from './mockLocalStorage'
import { mockProfile } from './mockProfile'

global.localStorage = new LocalStorage()

it('_clearStorage removes namespaced access token', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.access_token')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced id token', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.id_token')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced expires at', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.expires_at')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced id', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.id')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced full name', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.full_name')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced first name', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.first_name')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced last name', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.last_name')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced image url', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.image_url')).toEqual(
    null
  )
})

it('_clearStorage removes namespaced email', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  newService._clearStorage()
  expect(localStorage.getItem('gapi.email')).toEqual(
    null
  )
})
