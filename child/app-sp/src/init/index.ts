import store from '../store'
import { get_user_info } from '../https/public'

export async function getUserInfo() {
  let index = window.location.href.indexOf('token=');
  let token = '';
  if (index >= 0) {
    token = window.location.href.substr(index + 6).split('&')[0];
  }
  if (token) {
    store.commit('SET_TOKEN', token)
  }
  const resData = await get_user_info({'token': store.state.token});
  if (resData.code == 'Success') {
    store.commit('SET_LOGIN_NAME', resData.data.login_name);
    store.commit('SET_AUTH_INFO', {
      ...resData.data.permission_dict,
      // mirror_list: [],
      // alarm_info:[],
      // alarm_strategy:['alarm_strategy_create','delete','apply','stop','edit'],
      // alarm_contact:['add_contact','delete_contact','add_to_group','edit_contact','add_contact_group','delete_contact_group','edit_contact_group','remove_contact']

    });
  }
}