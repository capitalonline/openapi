
import Vue from 'vue';
import { 
  Button, 
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui';
import Vuex from 'vuex';
import cookie from './cookie';

Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: cookie.get('cds-op-token'),
    login_name: 'login_name',
    auth_info: {},
    loadingStatus: true,
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
    }
  },
  actions: {
  },
  modules: {
  },
});
