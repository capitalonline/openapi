import axios from "axios";
import store from "../store";
import action from '@/store/action';
// import { initGlobalState, MicroAppStateActions } from 'qiankun';

// const actions: MicroAppStateActions = initGlobalState({permission_dict: {}});
// actions.onGlobalStateChange((state, prev) => {
//   // state: 变更后的状态; prev 变更前的状态
// });

export async function getUserInfo() {
  let index = window.location.href.indexOf('token=');
  let token = '';
  if (index >= 0) {
    token = window.location.href.substr(index + 6).split('&')[0];
  }
  if (token) {
    store.commit('SET_TOKEN', token);
    action.setGlobalState({'token':token})
  }

  const resData = await axios.get(`/ecs_business/v1/account/get_user/?token=${ store.state.token}`)
  if (resData.data.code == 'Success') {
    console.log('getUserInfo', resData.data.data)
    store.commit('SET_LOGIN_NAME', resData.data.data.login_name);
    store.commit('SET_SPECIAL_USER', resData.data.data.is_special_user)
    store.commit('SET_AUTH_INFO', {...resData.data.data.permission_dict});
    // actions.setGlobalState({permission_dict: store.state.auth_info});
    action.setGlobalState({permission_dict: store.state.auth_info});
  } else if (resData.data.code === 'Unauthorized') {
    window.location.href = resData.data.data.sso + '?referer=' + window.location.href.split('?')[0];
  }
}
