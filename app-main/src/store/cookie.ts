import Cookie from 'js-cookie';

export default {
  set(key: string, val: string) {
    Cookie.set(key, val)
  },
  get(key: string) {
    return Cookie.get(key)
  },
  remove(key: string) {
    Cookie.remove(key)
  }
}