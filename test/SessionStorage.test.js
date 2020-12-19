import SessionStorage, { LOCAL_STORAGE_KEY } from '../src/SessionStorage'
import LocalStorageMock from './mocks/LocalStorageMock'

describe('SessionStorage', () => {
  let localStorage
  let target

  beforeEach(() => {
    localStorage = new LocalStorageMock()
    target = new SessionStorage(localStorage)
    target.set({ id: 1 })
  })

  it('should set the session', () => {
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))).toStrictEqual({
      id: 1,
    })
  })

  it('get should return session', () => {
    expect(target.get()).toStrictEqual({ id: 1 })
  })

  it('getItem should return item', () => {
    expect(target.getItem('id')).toStrictEqual(1)
  })

  it('clear should clear local storage', () => {
    target.clear()
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull()
    expect(target.get()).toBeNull()
  })
})
