/* eslint-env node, jest */
// https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
import AuthService from '../src/VueGapi/GoogleAuthService'
import { mockAuthResult } from './mockAuthResult'
import { GoogleAuthMock, GoogleUserMock } from './mockGoogleAuth'

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
  const gAuth = new GoogleAuthMock()
  newService.authInstance = gAuth
  newService.clientConfig = {
    scope: 'scope1',
  }
  // Test that onResolve callback works.
  let res = await new Promise((res) => {
    newService.grant(
      (googleUser) => res(googleUser),
      (error) => {
        console.log(error)
        expect(false).toBeTruthy()
      }
    )
  })
  expect(res).toBeInstanceOf(GoogleUserMock)

  // Test that onReject callback as well as the promise is rejected works.
  gAuth.currentUser.rejectGrant('access_denied')
  res = await new Promise((res) => {
    newService
      .grant(
        () => {
          expect(false).toBeTruthy()
        },
        (error) => {
          expect(error).toMatchObject({
            error: 'access_denied',
          })
          res()
        }
      )
      .catch((error) => {
        expect(error).toMatchObject({
          error: 'access_denied',
        })
        res()
      })
  })
  expect(res).toBeUndefined()

  // Test that the promise is also returned.
  gAuth.currentUser.resolveGrant()
  res = await newService.grant()
  expect(res).toBeInstanceOf(GoogleUserMock)
})
