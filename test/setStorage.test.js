/* eslint-env node, jest */
import AuthService from '../src/VueGAPI/GoogleAuthService'
import { mockAuthResult } from './mockAuthResult'
import LocalStorage from './mockLocalStorage'
import { mockProfile } from './mockProfile'

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

it('_setStorage localstorage is namespaced expires_at', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.expires_at')).toEqual(
    expect.any(String)
  )
})

it('_setStorage ensure no profile set returns no profile features', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult)
  expect(localStorage.getItem('gapi.id')).toEqual(
    null
  )
})

it('_setStorage localstorage is namespaced profile id', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.id')).toEqual(
    expect.any(String)
  )
})

it('_setStorage localstorage is namespaced profile full name', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.full_name')).toEqual(
    expect.any(String)
  )
})

it('_setStorage localstorage is namespaced profile first name', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.first_name')).toEqual(
    expect.any(String)
  )
})

it('_setStorage localstorage is namespaced profile last name', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.last_name')).toEqual(
    expect.any(String)
  )
})

it('_setStorage localstorage is namespaced profile image url', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.image_url')).toEqual(
    expect.any(String)
  )
})

it('_setStorage localstorage is namespaced profile email', () => {
  const newService = new AuthService()
  newService._setStorage(mockAuthResult, mockProfile)
  // localstroage must be a string
  expect(localStorage.getItem('gapi.email')).toEqual(
    expect.any(String)
  )
})

