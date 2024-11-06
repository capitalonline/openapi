import store from '../store'
import { get_user_info } from '../https/public'

export async function getUserInfo() {
  let index = window.location.href.indexOf('token=');
  let token = '';
  if (index >= 0) {
    token = window.location.href.substr(index + 6).split('&')[0];
  }
  if(!token){
    token = sessionStorage.getItem('Access-Token')
  }
  if (token) {
    store.commit('SET_TOKEN', token)
  }
  const resData = await get_user_info({'token': store.state.token});
  if (resData.code == 'Success') {
    store.commit('SET_LOGIN_NAME', resData.data.login_name);
    store.commit('SET_AUTH_INFO', {...resData.data.permission_dict,overview:[],snapshot_list:['snapshot_detail'],ecs_deatroyed:[]});
    store.commit('SET_SPECIAL_USER', resData.data.is_special_user)
    store.commit('SET_EMPLOYEE_NO', resData.data.employee_no)
  }
}
