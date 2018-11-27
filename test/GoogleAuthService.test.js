/* eslint-env node, jest */
// https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
import AuthService from '../src/VueGAPI/GoogleAuthService'
jest.mock('../src/VueGAPI/GoogleAuthService')

/*
const mockAuthResult = {
  expires_in: 123456,
  access_token: '',
  id_token: '',
  scope: '',
  first_issued_at: 1,
  expires_at: 1
}
*/

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
