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
    ecs_custom_item: JSON.parse(storage.get('ecs_custom_item')) || [
      '云服务器ID','云服务器名称','客户ID','客户名称','客户类别',
      '客户等级','可用区','计算规格','系统盘类型','系统盘容量',
      '数据盘类型','数据盘容量','所属宿主机','计费方式','创建时间','状态'
    ],
    custom_host:JSON.parse(storage.get('custom_host')) || [
      '主机名','机器状态','电源状态','虚拟机数量',
      '主机类型','主机用途','主机归属','主机来源','CPU型号',
      'CPU总核数','显卡型号','显卡数量','网卡型号','内存总容量','存储总容量',
      '专属客户','规格族','创建时间'
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
    SET_ECS_CUSTOM_ITEM(state, list) {
      state.ecs_custom_item = list;
      storage.set('ecs_custom_item', JSON.stringify(list))
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
