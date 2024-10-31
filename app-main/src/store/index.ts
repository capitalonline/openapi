
import Vue from 'vue';
import Vuex from 'vuex';
import cookie from './cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: cookie.get('cds-op-token'),
    login_name: 'login_name',
    auth_info: {},
    loadingStatus: true,
    is_special_user: false
  },
  getters: {
  },
  mutations: {
    SET_TOKEN (state, token) {
      cookie.set('cds-op-token', token);
      state.token = token;
    },
    SET_LOGIN_NAME (state, name) {
      state.login_name = name;
    },
    SET_AUTH_INFO (state, auth_info) {
      state.auth_info = auth_info;
    },
    SET_LOADING (state, loading) {
      state.loadingStatus = loading;
      setTimeout(() => {
        state.loadingStatus = true;
      })
    },
    SET_SPECIAL_USER (state, is_special_user) {
      cookie.set('is_special_user', is_special_user);
      state.is_special_user = is_special_user;
    }
  },
  actions: {
  },
  modules: {
  },
});
