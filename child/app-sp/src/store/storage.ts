export default {
  set(key, val) {
    localStorage.setItem(key, val)
  },
  get(key) {
    return localStorage.getItem(key)
  },
  remove(key) {
    localStorage.removeItem(key)
  }
}