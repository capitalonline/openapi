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
      '主机名','管理网IP','可用区','带外IP','机器状态','电源状态',
      '虚拟机数量','主机类型','主机用途','主机归属','主机来源',
      'CPU型号','显卡型号','显卡数量','网卡型号','CPU使用率',
      '内存使用率','创建时间','已分配显卡数量','物理机产品ID','物理机产品名称','可分配大页','显卡信息'

    ],
    nas_host:JSON.parse(storage.get('nas_host')) || [
      '客户ID','客户名称','文件系统ID/名称','NAS类型','协议类型','地域-可用区',
      'VPC','子网','挂载地址','使用量/总容量','空间使用率',
      '中转虚拟机ID','中转虚拟机IP','计费方式','状态','创建时间'

    ],
    pod:{
      cluster_host:JSON.parse(storage.get('cluster_host')) || [
        '名称','物理机','云主机','CPU型号','GPU型号','GPU数量',
        '存储容量','CPU消耗量','内存消耗量','GPU消耗量','存储消耗量'
      ],
    },

    host_search:{},
    pod_id:storage && storage.get ? storage.get('pod_id') : '',
    pod_name:storage && storage.get ? storage.get('pod_name') : '',
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
    SET_NAS_HOST(state,list){
      storage.set('nas_host',JSON.stringify(list))
      state.nas_host = list
    },
    SET_HOST_SEARCH(state,data){
      state.host_search = data
    },
    SET_CLUSTER_HOST(state,list){
      storage.set('cluster_host',JSON.stringify(list))
      state.pod.cluster_host = list
    },
    SET_POD(state,id){
      if(storage && storage.set){
        storage.set('pod_id',id)
      }
      state.pod_id = id
    }

  },
  actions: {
  },
  modules: {
  },
});
