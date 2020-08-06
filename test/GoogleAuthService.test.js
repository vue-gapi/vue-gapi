/* eslint-env node, jest */
// https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
import AuthService from '../src/VueGapi/GoogleAuthService'
import { mockAuthResult } from './mockAuthResult'

it('Ensure we have class', () => {
  const newService = new AuthService()
  expect(newService).toBeInstanceOf(AuthService)
})

it('_expiresAt returns string of numbers only', () => {
  const newService = new AuthService()
  const res = newService._expiresAt(mockAuthResult)
  expect(res).toEqual(expect.stringMatching(/^[0-9]*$/))
})
