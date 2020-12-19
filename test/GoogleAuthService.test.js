import GoogleAuthService from '../src/GoogleAuthService'
import SessionStorage from '../src/SessionStorage'
import GoogleClientProviderMock from './mocks/GoogleClientProviderMock'
import GoogleUserMock from './mocks/GoogleUserMock'
import LocalStorageMock from './mocks/LocalStorageMock'

const realDateNow = Date.now

describe('GoogleAuthService', () => {
  let target
  let sessionStorage
  let currentUser

  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2020-12-19T12:00:00Z').getTime())
  })

  afterAll(() => {
    global.Date.now = realDateNow
  })

  beforeEach(async () => {
    currentUser = new GoogleUserMock()
    sessionStorage = new SessionStorage(new LocalStorageMock())
    target = new GoogleAuthService(
      new GoogleClientProviderMock(
        {
          scope: 'scope1',
        },
        currentUser
      ),
      sessionStorage
    )
  })

  describe('login', () => {
    let response

    beforeEach(async () => {
      response = await target.login()
    })

    it('should initialize session', () => {
      expect(sessionStorage.get()).toStrictEqual({
        accessToken: 'ACCESS_TOKEN',
        idToken: 'ID_TOKEN',
        expiresAt: 1608502656000,
        id: '123',
        fullName: 'Jane Doe',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        imageUrl: 'https://via.placeholder.com/150',
      })
    })

    it('should resolve with login response', () => {
      expect(response.hasGrantedScopes).toBeFalsy()
      expect(response.currentUser).toBeInstanceOf(GoogleUserMock)
    })
  })

  describe('grant', () => {
    it('success', () => {
      expect(target.grant()).resolves.toBeInstanceOf(GoogleUserMock)
    })

    it('error', async () => {
      currentUser.rejectGrant('access_denied')
      expect(target.grant()).rejects.toStrictEqual({ error: 'access_denied' })
    })
  })
})
