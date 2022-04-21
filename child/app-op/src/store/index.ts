import { stringify } from 'qs';
import Vue from 'vue';
import Vuex from 'vuex';
import cookie from './cookie';
import storage from './storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qiankun: false,
    token: cookie.get('cds-op-token'),
    login_name: 'login_name',
    auth_info: {},
    loadingStatus: true,
    status_list: JSON.parse(storage.get('status_list')) || [],
    custom_host:JSON.parse(storage.get('custom_host')) || [
      '主机名','区域','机房名称','机柜编号','起始U位',
      '占用U位','电源状态','机器状态','操作系统','机器类型',
      '主机类型','主机用途','主机归属','主机来源','显卡型号',
      '显卡数量','带外IP','管理网IP','存储网IP1','CPU使用率',
      '内存使用率','创建时间','虚拟机数量','CPU','网卡'
    ],
    host_search:{},
  },
  getters: {
  },
  mutations: {
    SET_QIANKUN (state, flag) {
      state.qiankun = flag;
    },
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
    SET_STATUS_LIST (state, status) {
      storage.set('status_list', JSON.stringify(status));
      state.status_list = status;
    },
    SET_CUSTOM_HOST(state,list){
      storage.set('custom_host',JSON.stringify(list))
      state.custom_host = list
    },
    SET_HOST_SEARCH(state,data){
      state.host_search = data
    }

  },
  actions: {
  },
  modules: {
  },
});
