const LOCAL_STORAGE_KEY = 'gapi.session'

export default class SessionStorage {
  set(session) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session))
  }

  setItem(key, value) {
    const session = this.get() || {}
    session[key] = value
    this.set(session)
  }

  get() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  }

  getItem(key) {
    const session = this.get() || {}

    return session[key]
  }

  clear() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }
}
