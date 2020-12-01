/* eslint-env node, jest */
// https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
import AuthService from '../src/VueGapi/GoogleAuthService'
import { mockAuthResult } from './mockAuthResult'
import { GoogleAuth, GoogleUser } from './GoogleAuth'

it('Ensure we have class', () => {
  const newService = new AuthService()
  expect(newService).toBeInstanceOf(AuthService)
})

it('_expiresAt returns string of numbers only', () => {
  const newService = new AuthService()
  const res = newService._expiresAt(mockAuthResult)
  expect(res).toEqual(expect.stringMatching(/^[0-9]*$/))
})

it('grant() returns correct response', async () => {
  const newService = new AuthService()
  const gAuth = new GoogleAuth()
  newService.authInstance = gAuth
  newService.clientConfig = {
    scope: 'scope1',
  }
  let res = await new Promise((res, rej) => {
    newService.grant(
      (googleUser) => res(googleUser),
      (error) => {
        console.log(error)
        rej(error)
        expect(false).toBeTruthy()
      }
    )
  })
  expect(res).toBeInstanceOf(GoogleUser)
})
