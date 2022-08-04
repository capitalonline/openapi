import Cookie from "js-cookie";

export default {
  set(key, val) {
    Cookie.set(key, val)
  },
  get(key) {
    return Cookie.get(key)
  },
  remove(key) {
    Cookie.remove(key)
  }
}