import Cookie from 'js-cookie';

export default {
  set(key: string, val: string) {
    console.log('main-set',key,val)
    Cookie.set(key, val)
  },
  get(key: string) {
    console.log('main-get',key)
    return Cookie.get(key)
  },
  remove(key: string) {
    Cookie.remove(key)
  }
}