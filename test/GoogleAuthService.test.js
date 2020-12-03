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

describe('grant() returns correct response', () => {
  let newService
  let gAuth

  beforeEach(async () => {
    newService = new AuthService()
    gAuth = new GoogleAuthMock()
    newService.authInstance = gAuth
    newService.clientConfig = {
      scope: 'scope1',
    }
  })

  it('Test that onResolve callback works', async () => {
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
  })

  it('Test that onReject callback as well as the promise is rejected works', async () => {
    gAuth.currentUser.rejectGrant('access_denied')
    let res = await new Promise((res) => {
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
  })

  it('Test that the promise is also returned', async () => {
    let res = await newService.grant()
    expect(res).toBeInstanceOf(GoogleUserMock)
  })
})

describe('login() returns correct response', () => {
  let newService
  let gAuth

  beforeEach(async () => {
    newService = new AuthService()
    gAuth = new GoogleAuthMock()
    newService.authInstance = gAuth
    newService.clientConfig = {
      scope: 'scope1',
    }
  })

  it('Test that onResolve callback works', async () => {
    let res = await new Promise((res) => {
      newService.login(
        (googleUser) => res(googleUser),
        (error) => {
          console.log(error)
          expect(false).toBeTruthy()
        }
      )
    })
    expect(res).toHaveProperty('hasGrantedScopes')
    expect(res).toHaveProperty('gUser')
    const { hasGrantedScopes, gUser } = res
    expect(hasGrantedScopes).toBeFalsy()
    expect(gUser).toBeInstanceOf(GoogleUserMock)
  })

  it('Test that the promise is also returned', async () => {
    let res = await newService.login()
    expect(res).toHaveProperty('hasGrantedScopes')
    expect(res).toHaveProperty('gUser')
    const { hasGrantedScopes, gUser } = res
    expect(hasGrantedScopes).toBeFalsy()
    expect(gUser).toBeInstanceOf(GoogleUserMock)
  })
})
