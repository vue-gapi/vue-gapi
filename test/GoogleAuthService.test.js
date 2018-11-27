/* eslint-env node, jest */
// https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
import AuthService from '../src/VueGAPI/GoogleAuthService'
// import { mockAuthService } from './mockAuthResult'
jest.mock('../src/VueGAPI/GoogleAuthService')

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  AuthService.mockClear()
})

it('Can be mounted', () => {
  // eslint-disable-next-line
  const newService = new AuthService()
  expect(AuthService).toHaveBeenCalledTimes(1)
})

it('Should not be mounted', () => {
  expect(AuthService).not.toHaveBeenCalled()
})