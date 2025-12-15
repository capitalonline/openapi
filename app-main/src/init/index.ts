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
    store.commit('SET_LOGIN_NAME', resData.data.data.login_name);
    store.commit('SET_SPECIAL_USER', resData.data.data.is_special_user)
    store.commit('SET_AUTH_INFO', {...resData.data.data.permission_dict});
    store.commit('SET_EMPLOYEE_NO', resData.data.data.employee_no)
    //user_type为dz时，代表为达州项目的管理账号；为‘’时，为普通账号
    const user_type = resData.data.data.is_special_user == '1' && resData.data.data.az_id == 'c79d830f-06b9-4e83-9660-24aa2460867a' ? 'dz' : ''
    store.commit('SET_USER_TYPE', user_type)

    // actions.setGlobalState({permission_dict: store.state.auth_info});
    action.setGlobalState({permission_dict: store.state.auth_info});
    action.setGlobalState({is_special_user: store.state.is_special_user});
    action.setGlobalState({employee_no: store.state.employee_no});
    action.setGlobalState({login_name: store.state.login_name});
    action.setGlobalState({user_type: store.state.user_type});

  } else if (resData.data.code === 'Unauthorized') {
    window.location.href = resData.data.data.sso + '?referer=' + window.location.href.split('?')[0];
  }
}
