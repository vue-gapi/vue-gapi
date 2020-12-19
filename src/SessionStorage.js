export const LOCAL_STORAGE_KEY = 'gapi.session'

export default class SessionStorage {
  constructor(localStorage = window.localStorage) {
    this.localStorage = localStorage
  }

  set(session) {
    this.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session))
  }

  setItem(key, value) {
    const session = this.get() || {}
    session[key] = value
    this.set(session)
  }

  get() {
    return JSON.parse(this.localStorage.getItem(LOCAL_STORAGE_KEY))
  }

  getItem(key) {
    const session = this.get() || {}

    return session[key]
  }

  clear() {
    this.localStorage.removeItem(LOCAL_STORAGE_KEY)
  }
}
