/* eslint-env node, jest */
import AuthService from '../src/VueGAPI/GoogleAuthService'
import { mockAuthResult } from './mockAuthResult'
import LocalStorage from './mockLocalStorage'

global.localStorage = new LocalStorage()

it('_setStorage localstorage is namespaced access_token', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  expect(localStorage.getItem('gapi.access_token')).toEqual(
    expect.any(String)
  )
})

it('_setStorage localstorage is namespaced id_token', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  expect(localStorage.getItem('gapi.id_token')).toEqual(
    expect.any(String)
  )
})

it('_setStorage localstorage is namespaced expires_at', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.expires_at')).toEqual(
    expect.any(String)
  )
})

/*
it('_setStorage matches the actual obejct does not change', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  expect(localStorage).toEqual(
    expect.objectContaining({
      gapi.access_token: expect.any(String),
      gapi.id_token: expect.any(String),
      gapi.expires_at: expect.any(Number)
    })
  )
})
*/
